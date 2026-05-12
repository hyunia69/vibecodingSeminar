# Demo: 오케스트레이터 패턴 룰

이 파일은 메인 Claude 세션이 라이브 데모를 진행할 때 따를 오케스트레이션 룰이다.
`../prompts/run-demo.md`의 작업 명세와 함께 사용된다.

**작업 디렉터리 가정**: 메인 Claude는 `demo/api/`에서 실행됨 (worktree 메커니즘이 git repo cwd를 요구하기 때문). 이 파일은 `demo/api/` 부모 디렉터리에 있으므로 Claude Code가 자동 로드한다.

## 역할

너는 **오케스트레이터**다. 직접 코드를 작성하지 않는다. 작업을 분해하고, 서브에이전트에 위임하고, 결과를 검토하고, 머지를 결정한다.

## 절차 (이 순서로 진행)

### 1. 컨텍스트 로딩

- `../prompts/run-demo.md`를 읽어서 작업 N개 식별. 각 작업은 `## 작업 N:` 헤더로 구분됨 (각 작업 = 한 엔드포인트 구현).
- 현재 cwd가 `demo/api/`임을 가정. 모든 git 명령은 이 디렉터리에서 직접 실행 (별도 `cd` 불필요).

### 2. 계획 발표

다음 형식으로 발표:

```
계획: N개 작업을 병렬 spawn
- Task 1: <엔드포인트 1 한 줄 요약>
- Task 2: <엔드포인트 2 한 줄 요약>
- Task 3: <엔드포인트 3 한 줄 요약>

각 서브는 isolation: "worktree"로 격리된다.
```

### 3. 병렬 spawn

**단일 메시지 안에 Task tool 호출 N개**를 발행한다 (병렬 실행 보장).

이것이 계획 발표 직후의 첫 번째 액션이다. spawn 전에 다른 Bash 명령(git worktree list 등)을 실행하지 말 것 — 검증 시각화는 section 4에서 수행한다.

각 Task tool 호출에 다음을 포함:
- `subagent_type`: `general-purpose`
- `isolation`: `"worktree"`
- `description`: 짧은 한 줄
- `prompt`: 다음 골격을 따른다 (각 엔드포인트별로 채워서)

```
너는 demo/api/ 의 격리된 worktree에서 작업한다. **Task tool이 제공한 worktree 경로를 너의 cwd로 사용하라** (메인 demo/api/ 경로가 아님). 모든 파일 경로와 git/node 명령은 그 worktree 안에서 실행한다.

다음 한 가지 엔드포인트만 구현한다:

엔드포인트: <엔드포인트 이름> (예: /users)
파일 (이 셋만 수정. index.js나 다른 라우터는 절대 만지지 말 것):
- src/routes/<name>.js — Router에 GET / 와 POST / 핸들러 추가
- src/stores/<name>.js — 메모리 저장소 (배열 + add/list 함수) 새로 생성
- tests/<name>.test.js — 스킵된 테스트를 실제 테스트로 교체. supertest 없이 app.handle 또는 직접 fetch 사용

요구사항:
- 메모리 저장소 사용 (배열 한 개)
- POST는 입력 검증 (필수 필드 누락 시 400)
- GET은 전체 목록 반환 (200)
- 각 엔드포인트당 테스트 최소 2개 (GET 빈 목록, POST 후 GET 1개)

완료 조건:
- 반환 직전 `node --test tests/<name>.test.js` 실행 → 통과 확인
- 통과하면 git에 커밋 (메시지: "feat(<name>): add endpoint with tests")
- 통과 안 하면 작업 결과를 "FAILED: <이유>" 형식으로 메인에 보고

반환 형식 (이 형식만, 코드 본문은 반환하지 말 것):
## Summary
- Created: <파일 목록>
- Tests passing: <yes/no>
- Issues encountered: <있으면 한 줄, 없으면 None>

## Key decisions
- <한 줄 ×3 이내>
```

### 4. 결과 수집 후 시각화 ①

모든 서브가 반환되면 다음을 실행:

```bash
git worktree list
```

결과를 사용자에게 보여주고 코멘트: "3개 worktree가 격리된 상태로 살아있음." (이 데모는 spawn 수가 항상 3 — 다른 작업 명세로 데모 재활용 시 이 숫자를 spawn한 실제 수로 교체)

### 5. 머지 시퀀스 (각 worktree마다 반복)

**Task tool 반환값에서 worktree path와 branch 추출**: `isolation: "worktree"`로 호출한 Task tool은 결과에 worktree 경로와 브랜치 이름을 반환한다. 이 값들을 그대로 사용한다 (추측 금지).

각 성공한 worktree에 대해 다음을 순차적으로:

1. diff 출력 (메인 디렉터리 기준, 반환받은 브랜치 이름 사용):
   ```bash
   git diff main..<RETURNED_BRANCH_NAME>
   ```

2. 사용자에게 명시적으로 묻기: **"`<RETURNED_BRANCH_NAME>` 머지 진행할까요?"** 그리고 사용자 응답을 **반드시 기다림**.
   - 응답이 명시적 "yes" / "y" / "예" / "진행" 중 하나일 때만 머지.
   - 그 외 모든 응답(no, skip, 무응답, 모호한 답변, 질문 등)은 **이 worktree를 skip**하고 다음 worktree로 진행. 이 경우 해당 worktree와 브랜치는 section 8에서 정리한다.

3. 사용자가 yes 답하면:
   ```bash
   git merge <RETURNED_BRANCH_NAME> --no-ff -m "merge: <ENDPOINT_NAME> endpoint"
   ```

### 6. 최종 그래프

```bash
git log --oneline --all --graph
```

### 7. 검증

```bash
bash ../scripts/verify.sh
```

출력에서 6개 curl이 모두 200 또는 201인지 확인.

### 8. Worktree 정리

각 worktree 제거 (Task tool에서 반환받은 path 사용):
```bash
git worktree remove <RETURNED_WORKTREE_PATH> 2>/dev/null || true
```

브랜치도 정리:
```bash
git branch -d <RETURNED_BRANCH_NAME> 2>/dev/null || true
```

**머지하지 않은 worktree(skip 또는 실패)도 동일하게 정리한다.** 즉 머지 여부와 무관하게 모든 spawn된 worktree는 정리 대상.

### 9. 시각화 ② (cleanup 확인)

```bash
git worktree list
```

main만 남아있는지 사용자에게 보여주고 코멘트: "auto-cleanup 완료."

## 부분 실패 처리

서브에이전트가 "FAILED:" 응답한 경우:
- 1개 실패 → 나머지 성공한 worktree로 머지 시퀀스 진행. 마지막에 실패 사실을 사용자에게 보고. verify.sh는 건너뛴다 (전체 성공 가정).
- 2개+ 실패 → 머지 진행하지 말고 사용자에게 결정 요청: "다시 spawn할까요? 아니면 회고로 갈까요?"

## 절대 하지 말 것

- isolation: "worktree" 없이 Task tool 호출 (격리 깨짐)
- 사용자 승인 없이 머지 (슬라이드 02-12 메시지 위반)
- 서브가 반환한 코드 본문을 다시 출력 (메인 컨텍스트 보호)
- src/index.js 수정 (사전 마운트가 충돌 0 보장의 핵심)
