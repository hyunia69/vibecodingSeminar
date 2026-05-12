# 오케스트레이터 데모 — 발표자 가이드

라이브 데모: 메인 Claude Code 세션이 3 서브에이전트를 worktree에 spawn → 머지 → 검증.

**소요 시간**: 8–10분
**관련 슬라이드**: 02-13 (직전), 02-14 (이 데모), 02-15 (직후)

---

## 사전 점검 체크리스트

### 24시간 전
- [ ] `cd demo/api && npm install` 완료 (오프라인 대비)
- [ ] `bash demo/scripts/reset.sh` 정상 실행 (프로젝트 루트 또는 어디서든 동작 — 스크립트가 자체 경로 기준)
- [ ] 풀 데모 1회 리허설 (`cd demo/api && claude` → 트리거) — 시간 측정 및 메인 에이전트 행동 확인
- [ ] 포트 3737 충돌 없음 확인 (Linux/Mac: `lsof -i:3737`, Windows: `netstat -ano | findstr 3737`)
- [ ] Claude Code 인증 갱신
- [ ] `git --version` ≥ 2.28

### 5분 전
- [ ] `bash demo/scripts/reset.sh` 마지막 실행 (클린 상태 보장)
- [ ] `demo/api/`로 이동 (`cd demo/api`)
- [ ] Claude Code 새 세션 시작 (이전 컨텍스트 안 섞이게)
- [ ] 터미널 폰트 확대 (뒷자리 가독성)
- [ ] 직전 슬라이드(02-13) 띄워두기

### 핵심 변경 (옵션 1 적용)
메인 Claude는 **프로젝트 루트가 아니라 `demo/api/`에서 실행**됨. `demo/api/`가 git repo이므로 worktree 메커니즘이 작동. `demo/CLAUDE.md`는 walk-up으로 자동 로드됨.

---

## 라이브 큐 카드 (발표자가 칠 명령들)

### 단계 0 — 셋업 노출 (0:00–0:30)

```bash
cd demo/api
git log --oneline
head -30 ../CLAUDE.md
head -30 ../prompts/run-demo.md
```

코멘트: "초기 상태 — 커밋 3개, 룰과 명세는 이렇게 분리돼있다."

### 단계 1 — 메인 Claude 부팅 (0:30)

`demo/api/`에서 그대로 띄움 (worktree 메커니즘이 git repo cwd를 요구):

```bash
claude
```

이 위치에서는 `../CLAUDE.md`(오케스트레이터 룰)가 walk-up으로 자동 로드됨.

### 단계 2 — 트리거 (0:45)

Claude Code 입력창에 한 줄:

```
../CLAUDE.md의 오케스트레이터 룰을 따라 ../prompts/run-demo.md의 작업을 실행해줘.
```

(자동 로드된 룰을 명시 참조해 청중에게 출처 노출)

### 단계 3 — 대기 (1:30–4:30)

메인 세션이 3개 Task tool을 한 메시지에 호출. 발표자는 코멘트 기회:

> "지금 3개 서브에이전트가 각자 격리된 worktree에서 동시에 작업 중. 직렬이면 ~9분 걸렸을 작업이 ~3분에 끝납니다."

### 단계 4 — 머지 일시정지 ×3 (4:45–6:30)

메인이 각 worktree마다 diff 출력 후 "머지할까요?" 물음.
**발표자가 명시적으로 yes 답** (한 번씩, 총 3번).

각 yes 사이에 코멘트:

> "여기서 머지는 자동이 아닙니다. 메인 에이전트가 묻고, 사람이 결정. 슬라이드 02-12에서 본 것처럼."

### 단계 5 — 검증 (6:45)

메인이 `bash ../scripts/verify.sh` 자동 실행 (cwd가 `demo/api/`이므로 상대 경로).
6개 curl 결과가 모두 200/201로 출력됨.

### 단계 6 — 회고 (8:00–9:00)

```bash
git log --oneline --all --graph
```

발표자 멘트 (1분):

> "3개 작업, 3개 worktree, 3번의 사람이 결정한 머지. 토큰은 메인 세션에 표시된 양 — 직렬보다 살짝 더 들지만 시간이 1/3.
> 핵심: 메인은 직접 코드 안 짰음. 분해·위임·검토·머지만 했음. 이게 오케스트레이터 패턴."

---

## 회복 시나리오

### 1개 서브 실패
메인이 자동 리포팅. 나머지 2개로 진행. 회고에서 "정직한 부분 성공" 톤으로.

### 2개+ 실패 또는 메인 멈춤
1. ESC로 Claude Code 정지 (또는 새 세션)
2. `bash demo/scripts/reset.sh`
3. 트리거 재입력
   - 시간 여유 없으면 슬라이드 02-15(함정)로 점프, 회고 톤으로 전환

### Wi-Fi 끊김
1. Claude Code 재시작
2. `bash demo/scripts/reset.sh`
3. 트리거 재입력

---

## 파일 구조 (참고)

```
demo/
├── README.md              # 이 파일
├── CLAUDE.md              # 오케스트레이터 룰
├── prompts/
│   └── run-demo.md        # 3 엔드포인트 명세
├── scripts/
│   ├── reset.sh           # 클린 상태 복원
│   └── verify.sh          # 6 curl 최종 검증
└── api/                   # 작업 대상 (별도 git repo)
    ├── package.json
    ├── src/
    │   ├── index.js       # 사전 라우터 마운트 ★
    │   ├── routes/        # 3 스텁
    │   └── stores/        # 빈 (서브가 채움)
    └── tests/             # 3 스텁
```
