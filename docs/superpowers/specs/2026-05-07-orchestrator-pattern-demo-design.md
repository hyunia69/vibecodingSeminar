# 오케스트레이터 패턴 라이브 데모 — 디자인 명세

**작성일**: 2026-05-07
**목적**: 세미나 중 슬라이드 02-13(오케스트레이터 패턴) 직후 진행할 라이브 데모 — 메인 Claude Code 세션이 3개 서브에이전트를 병렬 spawn하고, 각 서브가 격리된 git worktree에서 작업하며, 메인이 diff 검토 후 머지까지 수행하는 흐름을 8–10분 안에 실연
**관련 슬라이드**: 02-12(worktree 메커니즘), 02-13(오케스트레이터 패턴), 02-14(데모), 02-15(함정)

---

## 1. 컨텍스트와 의도

### 1.1 현 상태와 변경의 동기

슬라이드 02-14는 현재 **인간이 3 터미널을 직접 띄우는 패턴**을 보여준다 (`claude -w feature-payments` × 3). 이는 worktree 격리는 보여주지만 **오케스트레이터 패턴 자체는 아니다**. 사용자가 메인 Claude 세션에 작업을 주면 메인이 알아서 분해·병렬 spawn·머지까지 하는 패턴(슬라이드 02-13에 약속한 것)을 데모로 검증할 필요가 있다.

이 데모는 02-13의 "약속 영수증" 역할을 한다.

### 1.2 메시지 정렬

이 데모는 다음 슬라이드 메시지들을 라이브로 증명한다:

| 슬라이드 | 메시지 | 데모에서 어떻게 증명되는가 |
|---|---|---|
| 02-12 | worktree는 격리만, 머지는 수동 | 메인이 머지 전에 3번 일시정지하고 발표자 승인 받음 |
| 02-13 | CLAUDE.md = 가이드라인 + 명시 트리거로 발동 | `demo/CLAUDE.md`에 룰, 발표자가 한 줄 트리거로 발동 |
| 02-13 | 메인 세션이 diff 검토·머지 결정 책임 | 데모 시퀀스 중반의 핵심 흐름 |
| 02-15 | 함정 (실패 시 회고 톤으로 자연 전환 가능) | 백업 — 실패 시 02-15에서 산 증거로 활용 |

### 1.3 청중과 환경

- **청중**: 시니어 개발자 2명
- **세미나 길이**: 90–120분
- **이 데모 비중**: 8–10분 (전체 데모 ① ② ③ 중 첫 번째)
- **시연 환경**: Windows 11 + 단일 터미널 (WSL/tmux 사용 안 함)
- **언어**: 한국어 본문 + 영어 기술 키워드

---

## 2. 핵심 디자인 결정

### 2.1 작업 대상: 미니 Node/Express API

3 서브에이전트가 각각 다음 엔드포인트를 구현:
- `/users` — GET(목록) + POST(생성)
- `/products` — GET + POST
- `/orders` — GET + POST

### 2.2 시연 형식: 풀 라이브 (백업 스냅샷 없음)

빈 스타터에서 시작해 청중 보는 앞에서 진행. 망할 위험을 감수하는 대신 마법 같은 임팩트 추구. 회복 메커니즘은 `reset.sh` 한 가지.

### 2.3 인스트럭션 분리: CLAUDE.md(룰) + prompts/run-demo.md(작업)

- **`demo/CLAUDE.md`** — 오케스트레이터 패턴 룰 (어떻게 일하는가)
- **`demo/prompts/run-demo.md`** — 3 엔드포인트 작업 명세 (무엇을 하는가)
- 분리 이유: 같은 룰로 다른 작업(blog, todo 등) 데모 재활용 가능. 시니어에게 "룰과 작업이 분리된 구조"라는 학습 가치.

### 2.4 충돌 0 보장: 사전 라우터 마운트

`src/index.js`에 3개 라우터를 미리 import + mount. 각 서브에이전트는 본인 라우터 파일·스토어 파일·테스트 파일만 수정. **`index.js`를 건드리지 않으므로 직교 병렬**이 보장된다.

이는 데모 안정성 vs "현실적 머지 충돌 시연"의 트레이드오프 — 안정성 선택.

### 2.5 화면 구성: 단일 터미널 + 일시정지 + worktree 가시화 ×2

- 단일 메인 Claude Code 터미널 (분할 화면 없음)
- 머지 전 3번 일시정지 ("머지할까요?" → 발표자 yes)
- 메인 Claude가 두 시점에 `git worktree list` 자동 실행:
  1. 모든 서브 완료 직후 → "3개 격리됐다" 시각화
  2. 머지·정리 후 → "다 사라졌다" auto-cleanup 시각화

### 2.6 단일 터미널 제약: 시각화는 메인 Claude가 수행

Task tool 병렬 실행 중 메인 세션은 동기 대기 → 발표자가 같은 터미널에서 `git worktree list` 칠 수 없음. 따라서 **모든 시각화 명령은 CLAUDE.md 룰에 박아두고 메인이 알아서 수행**.

### 2.7 포트: 3737

기본 3000 대신 3737 사용 — 흔한 충돌 회피.

---

## 3. 폴더 구조와 컴포넌트

```
demo/
├── README.md                          # 발표자 큐 카드
├── CLAUDE.md                          # 오케스트레이터 룰
├── prompts/
│   └── run-demo.md                    # 3 엔드포인트 명세
├── scripts/
│   ├── reset.sh                       # 클린 상태 복원
│   └── verify.sh                      # 6개 curl 최종 검증
└── api/                               # 작업 대상 (별도 git repo)
    ├── .git/                          # git init + 초기 커밋 완료
    ├── .gitignore
    ├── package.json                   # express, supertest 의존성
    ├── node_modules/                  # 사전 npm install
    ├── src/
    │   ├── index.js                   # ★ 3 라우터 import + mount 사전 작성
    │   ├── routes/
    │   │   ├── users.js               # 스텁: export default Router()
    │   │   ├── products.js            # 스텁
    │   │   └── orders.js              # 스텁
    │   └── stores/                    # 빈 폴더, 서브가 채움
    └── tests/
        ├── users.test.js              # 스텁 (skip)
        ├── products.test.js           # 스텁
        └── orders.test.js             # 스텁
```

### 3.1 컴포넌트 책임표

| 파일 | 작성 시점 | 내용 |
|---|---|---|
| `demo/CLAUDE.md` | 사전 | 오케스트레이터 룰 — Task tool로 N개 spawn / `isolation: "worktree"` 필수 / 각 worktree에 prompts/run-demo.md의 해당 작업만 전달 / 모든 서브 완료 후 `git worktree list` 실행 / 각 worktree마다 diff 출력 → 발표자 승인 대기 → `git merge` / 머지 후 worktree 정리 / `verify.sh` 실행 / 최종 `git worktree list` |
| `demo/prompts/run-demo.md` | 사전 | 3 엔드포인트 명세 (경로, 동작, 입력 검증, 응답 스키마, 테스트 요구사항) |
| `demo/api/src/index.js` | 사전 | Express 부트스트랩 + `app.use('/users', ...)` × 3 |
| `demo/api/src/routes/{X}.js` | 사전 (스텁) | `import { Router } from 'express'; export default Router();` |
| `demo/api/tests/{X}.test.js` | 사전 (스텁) | `it.skip(...)` 한 줄 — 테스트 러너가 스킵 |
| `demo/scripts/reset.sh` | 사전 | worktree 정리 → 초기 커밋으로 reset → 추가 브랜치 삭제 |
| `demo/scripts/verify.sh` | 사전 | 서버 백그라운드 실행 → 6 curl → trap으로 종료 |
| `demo/README.md` | 사전 | 사전 점검 체크리스트 + 라이브 큐 카드 (발표자가 칠 명령들과 예상 반응) |

### 3.2 데모 트리거 (라이브 한 줄)

```
> demo/CLAUDE.md의 오케스트레이터 룰을 따라 demo/prompts/run-demo.md의 작업을 실행해줘.
```

이 한 줄로 전체 흐름이 발동된다.

**작업 디렉터리**: 발표자는 프로젝트 루트(`vibe-coding-seminar/`)에서 `claude`를 띄운다. 프로젝트 루트의 CLAUDE.md가 자동 로드되며, `demo/CLAUDE.md`는 위 트리거가 명시적으로 읽도록 지시한다. 트리거 단계에서 청중에게 룰의 존재가 가시화된다.

---

## 4. 시퀀스: 8–10분 타임라인

| 시간 | 보이는 것 | 누가 / 명령 |
|---|---|---|
| 0:00 | 직전 슬라이드(02-13) 종료 | — |
| 0:00–0:30 | 셋업 노출 — 초기 상태 확인 | 발표자: `cd demo/api && git log --oneline`, `cat ../CLAUDE.md`, `cat ../prompts/run-demo.md` |
| 0:30 | 메인 Claude Code 부팅 | `claude` |
| 0:45 | 트리거 입력 | 발표자: 위 트리거 한 줄 |
| 1:00–1:30 | 메인이 두 파일 읽고 계획 발표 | 메인 Claude |
| **1:30** | **단일 assistant 메시지 안에 Task tool 호출 3개 (병렬)** ← 시각 임팩트 ① | 메인 Claude |
| 1:30–4:30 | 병렬 작업 진행. 메인 = 상태 인디케이터 | (발표자 코멘트 기회) |
| 4:30 | 3 서브 완료 — 메인에 결과 요약 | 서브 → 메인 |
| **4:30–4:45** | **`git worktree list` ← 시각 임팩트 ②** | 메인 Claude |
| 4:45–6:30 | **머지 시퀀스 ×3 ← 시각 임팩트 ③**<br>각 worktree마다: diff → "머지할까요?" → 발표자 yes → `git merge` | 메인 ↔ 발표자 |
| 6:30 | `git log --oneline --all --graph` | 메인 Claude |
| 6:45 | `bash demo/scripts/verify.sh` → 6 curl 결과 | 메인 Claude |
| 7:30 | worktree 정리 (`git worktree remove` × 3) | 메인 Claude |
| **7:45** | **`git worktree list` 재실행 ← 시각 임팩트 ④** (auto-cleanup) | 메인 Claude |
| 8:00–9:00 | 발표자 회고 (토큰 사용량, 직렬 vs 병렬 시간 비교, "머지는 수동이었다") | 발표자 |
| 9:00 | 다음 슬라이드(02-15) 전환 | — |

### 4.1 발표자 인지 부하

발표자가 외울 것: **셋업 3 명령 + 트리거 1줄 + 머지 yes ×3**. 그게 전부.

---

## 5. 데이터 / 메시지 흐름

```
발표자
  ↓ 트리거 (한 줄)
메인 Claude (오케스트레이터)
  ├─ 파일 읽기: demo/CLAUDE.md (룰), demo/prompts/run-demo.md (작업)
  ├─ 계획 수립 → 3개 작업 식별
  ├─ Task tool × 3 (단일 assistant 메시지의 3개 tool_use 블록 — 동시 실행) — 각 호출에 isolation:"worktree" + 해당 작업 명세 + "반환 전 node --test 통과 필수" 지시 전달
  │     ├─ Subagent A — wt-users/  → routes/users.js + stores/users.js + tests
  │     ├─ Subagent B — wt-products/ → routes/products.js + stores/ + tests
  │     └─ Subagent C — wt-orders/  → routes/orders.js + stores/ + tests
  ├─ (모든 서브 완료까지 동기 대기)
  ├─ 결과 수신 (각 서브의 요약 + diff 위치)
  ├─ git worktree list → 청중에게 격리 노출
  ├─ Loop × 3 (각 worktree에 대해):
  │     ├─ git -C <wt> diff main
  │     ├─ "머지할까요?" 물음
  │     ├─ (발표자 응답 대기)
  │     └─ git merge wt-<name>
  ├─ git log --oneline --all --graph
  ├─ bash demo/scripts/verify.sh
  ├─ git worktree remove × 3
  └─ git worktree list (cleanup 확인)
```

### 5.1 서브에이전트 응답 형식 (CLAUDE.md에 강제)

각 서브는 다음 형식으로만 메인에 반환 (메인 컨텍스트 보호):

```
## Summary
- Created: <파일 목록>
- Tests passing: <yes/no>
- Issues encountered: <있으면 한 줄, 없으면 None>

## Key decisions
- <한 줄 ×3 이내>
```

코드 본문은 **반환하지 않음**. 메인이 필요시 `git diff`로 직접 조회.

---

## 6. 실패 모드 처리

### 6.1 시나리오와 완화

| # | 시나리오 | 가능성 | 완화 / 회복 |
|---|---|---|---|
| 1 | 서브 1개가 깨진 코드 생성 | 中 | 메인이 Task tool 호출 시 prompt에 *반환 전 `node --test` 통과 필수* 지시 포함 (CLAUDE.md 룰에 명시). 실패 시 서브가 메인에 실패 요약 반환. 메인은 나머지 2개와 머지 진행 + 실패 리포팅 |
| 2 | Wi-Fi 끊김 / API 응답 지연 | 中 | Claude Code 재시작 → `bash demo/scripts/reset.sh` → 트리거 재입력. 1–2분 비용. 발표자 멘트로 시간 채움 |
| 3 | 시간 오버 (서브가 느림) | 中 | 사전 리허설로 발표 시간대 동일 조건 측정 |
| 4 | 포트 3737 사용 중 | 低 | `verify.sh` 명시 + 사전 점검에 `lsof -i:3737` 포함 |
| 5 | 이전 worktree 잔재로 spawn 실패 | 低 | `reset.sh`가 강제 정리. 데모 직전 반드시 실행 |
| 6 | 머지 충돌 | 매우 低 | 사전 라우터 마운트로 직교 보장 → 발생 시 발표자가 즉석 해결 (teaching moment 전환 가능) |

### 6.2 회복 결정 트리 (라이브 중)

```
서브에이전트 실패 발생
├─ 1개 실패 → 메인이 자동 리포팅, 데모 진행 ("부분 성공도 정직한 결과")
├─ 2개+ 실패 → 발표자 판단:
│   ├─ 시간 여유 → reset → 재실행
│   └─ 시간 없음 → 슬라이드 02-15(함정)로 점프, 회고 톤으로 전환
└─ 메인 자체 멈춤 → ESC → reset.sh → 재시작
```

---

## 7. 검증

### 7.1 `verify.sh` 동작

**전제**: 3 엔드포인트 모두 머지 완료된 상태에서만 의미 있음. 부분 성공 경로(서브 1+개 실패 → 일부만 머지)에서는 `verify.sh`를 건너뛰고 회고로 직행.

```bash
#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../api"

node src/index.js &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT
sleep 1

PORT=3737

echo "─── /users ───"
curl -sf -X POST localhost:$PORT/users -H 'Content-Type: application/json' \
  -d '{"name":"alice","email":"a@x.com"}'
curl -sf localhost:$PORT/users

echo "─── /products ───"
curl -sf -X POST localhost:$PORT/products -H 'Content-Type: application/json' \
  -d '{"name":"widget","price":42}'
curl -sf localhost:$PORT/products

echo "─── /orders ───"
curl -sf -X POST localhost:$PORT/orders -H 'Content-Type: application/json' \
  -d '{"productId":"p-1","qty":2}'
curl -sf localhost:$PORT/orders

echo "✅ All 6 calls passed"
```

청중이 보는 것: 6개 JSON 응답 + 마지막 `✅`.

### 7.2 `reset.sh` 동작

1. 모든 worktree 강제 제거 (`git worktree remove --force`)
2. `api/`를 최초 커밋으로 hard reset
3. main 외 모든 브랜치 삭제

### 7.3 사전 점검 체크리스트 (`demo/README.md`)

**24시간 전**:
- [ ] `cd demo/api && npm install` 완료 (오프라인 대비)
- [ ] `bash demo/scripts/reset.sh` 정상 실행
- [ ] 풀 데모 1회 리허설 — 시간 측정
- [ ] 포트 3737 충돌 없음 (`lsof -i:3737` 또는 Windows 동등)
- [ ] Claude Code 인증 갱신
- [ ] `git --version` ≥ 2.5

**5분 전**:
- [ ] `bash demo/scripts/reset.sh` 마지막 실행
- [ ] Claude Code 새 세션
- [ ] 터미널 폰트 확대 (뒷자리 가독성)

---

## 8. 슬라이드 02-14 정리

이 데모를 추가하면 슬라이드 02-14의 기존 "3 터미널 동시 실행" 콘텐츠는 **재구성 필요**. 옵션:

- **A**: 02-14를 오케스트레이터 데모 슬라이드로 교체 (기존 인간-병렬 패턴 폐기)
- **B**: 02-14는 인간-병렬 패턴 그대로 두고, 새 슬라이드(02-14b 등)로 오케스트레이터 데모 추가
- **C**: 02-14에서 두 패턴을 비교 ("이 슬라이드 — 인간이 띄움 / 다음 데모 — Claude가 띄움")

**현재 명세 범위는 데모 자체에 한정**. 슬라이드 정렬은 별도 결정으로 사용자에게 제안.

---

## 9. 명시적으로 범위에서 제외

- TypeScript 변형 (빌드 단계가 라이브 흐름 끊음)
- 데이터베이스 (메모리 저장소만)
- 인증/인가 (스코프 폭증)
- WSL/tmux 사전 셋업 (단일 터미널 결정)
- 백업 스냅샷·녹화 폴백 (풀 라이브 결정)
- 의도적 머지 충돌 시연 (안정성 우선)
- 4개 이상 서브에이전트 (3개로 충분 + 시각 명료)

---

## 10. 미해결 / 사용자 결정 필요

- 슬라이드 02-14 정렬 (위 §8) — 별도 작업으로 처리
- 슬라이드 02-13의 "AGENTS.md (또는 메인 CLAUDE.md)" 표현을 CLAUDE.md로 통일할지 (사용자 메모리에 선호도 저장됨)
- `demo/CLAUDE.md`의 정확한 본문 (구현 계획 단계에서 작성)
- `demo/prompts/run-demo.md`의 3 엔드포인트 명세 세부 (구현 계획 단계에서 작성)
