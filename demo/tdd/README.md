# TDD 데모 — 토큰 비용 계산기

Superpowers의 Red-Green-Refactor 흐름을 실제로 보여주는 작은 예시.

**의도적으로 의존성 없음** — Node.js 20+의 내장 test runner(`node:test`)와 assert(`node:assert`)만 사용. `npm install` 불필요.

## 파일 구조

```
demo/tdd/
├── README.md             ← 이 파일
└── src/
    ├── tokenCost.mjs        ← 원본 코드 (production용)
    └── tokenCost.test.mjs   ← 테스트 코드 (production에 안 들어감)
```

세미나 슬라이드에서 강조한 대로:
- **원본과 테스트는 별도 파일**
- **이름 규칙으로 짝지어짐** (`.test.mjs` 접미사)
- **같은 폴더 옆** 컨벤션 (Jest/Vitest 스타일)

## 실행

```bash
cd demo/tdd
node --test src/tokenCost.test.mjs
```

## TDD로 만들어진 흐름 (재현 가이드)

### Phase 1 — Red: 테스트 먼저

`tokenCost.mjs` 없이 `tokenCost.test.mjs`만 작성. 실행:

```bash
$ node --test src/tokenCost.test.mjs
✖ ERR_MODULE_NOT_FOUND: Cannot find module './tokenCost.mjs'
```

이 빨간색이 **테스트가 실제로 무언가를 검증한다는 증거**. 만약 처음 실행에 통과하면 테스트가 가짜.

### Phase 2 — Green: 통과까지 구현

`tokenCost.mjs` 작성. 한 번에 완벽하게 짤 필요 없음 — 가장 첫 테스트만 통과시키고, 그 다음 테스트, 그 다음...

```bash
$ node --test src/tokenCost.test.mjs
ℹ tests 11
ℹ pass 11
ℹ fail 0
```

### Phase 3 — Refactor: 초록 유지하며 정리

예: 가격표를 별도 파일로 분리, 함수명 정리, 타입 추가. **매번 테스트 재실행** — 초록 깨지면 즉시 복구.

## AI 에이전트와의 결합

Superpowers의 `test-driven-development` skill은 위 3단계를 **분리된 턴**으로 강제합니다:

1. Turn 1: 테스트만 작성·실행 → **실패 로그 첨부 필수**
2. Turn 2: 구현 → 다시 실행 → **통과 로그 첨부 필수**
3. Turn 3 (선택): 리팩토링 → 통과 유지 확인

`verification-before-completion` skill이 각 단계의 로그 첨부를 요구하기 때문에, 에이전트가 *"같이 짜맞춘 가짜 테스트"*를 만들기 어렵습니다.

## 왜 이 모듈인가

세미나 슬라이드 **02-07 토큰 경제학**과 **02-06c 윈도우 vs 비용**의 수식을 그대로 코드화한 것. 캐싱 효과를 숫자로 검증할 수 있어 데모로 적합합니다.
