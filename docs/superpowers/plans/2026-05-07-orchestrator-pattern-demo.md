# 오케스트레이터 패턴 데모 — 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 슬라이드 02-13 직후 라이브 시연할 8–10분 오케스트레이터 데모의 모든 정적 자산(스타터 API, 룰, 명세, 스크립트, 발표자 가이드)을 만들고, 실제 라이브 시연 직전까지 필요한 모든 것을 준비한다.

**Architecture:** `demo/` 폴더 안에 (a) 작업 대상 미니 Express API (`demo/api/`, 별도 git repo), (b) 메인 에이전트가 따를 오케스트레이터 룰(`demo/CLAUDE.md`), (c) 작업 명세(`demo/prompts/run-demo.md`), (d) 셋업·검증 스크립트, (e) 발표자 큐 카드를 배치. `demo/api/src/index.js`에 3 라우터를 사전 마운트해 직교 병렬을 보장.

**Tech Stack:** Node.js 18+, Express 4.x, `node --test` (Node 내장), bash (Git Bash on Windows), git 2.5+

**Reference:** `docs/superpowers/specs/2026-05-07-orchestrator-pattern-demo-design.md`

**환경 메모:**
- 세미나 프로젝트는 git 저장소가 아님 → 외부 파일들에는 commit 단계 없음
- `demo/api/`는 자체 git 저장소 → 초기 커밋만 plan에서 생성
- 모든 셸 명령은 bash 기준 (Claude Code 기본 셸, Windows에서는 Git Bash)
- 작업 디렉터리: 별도 명시 없으면 프로젝트 루트(`vibe-coding-seminar/`)

---

## Task 1: demo/api 폴더 구조 + .gitignore 생성

**Files:**
- Create: `demo/api/.gitignore`

- [ ] **Step 1: api 폴더 생성**

```bash
mkdir -p demo/api/src/routes demo/api/src/stores demo/api/tests
```

- [ ] **Step 2: 폴더 생성 확인**

Run: `ls demo/api/src/`
Expected: `routes  stores`

- [ ] **Step 3: .gitignore 작성**

Create `demo/api/.gitignore`:

```
node_modules/
*.log
.DS_Store
```

- [ ] **Step 4: 파일 확인**

Run: `cat demo/api/.gitignore`
Expected: 위 3줄이 출력됨

---

## Task 2: package.json 작성

**Files:**
- Create: `demo/api/package.json`

- [ ] **Step 1: package.json 작성**

Create `demo/api/package.json`:

```json
{
  "name": "demo-orchestrator-api",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "test": "node --test tests/"
  },
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

- [ ] **Step 2: JSON 유효성 확인**

Run: `node -e "JSON.parse(require('fs').readFileSync('demo/api/package.json'))"`
Expected: 출력 없음 (성공). 에러 나면 JSON 문법 점검.

---

## Task 3: src/index.js 사전 라우터 마운트

**Files:**
- Create: `demo/api/src/index.js`

- [ ] **Step 1: index.js 작성**

Create `demo/api/src/index.js`:

```javascript
import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3737;

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export default app;
```

- [ ] **Step 2: 파일 확인**

Run: `head -5 demo/api/src/index.js`
Expected: `import express from 'express';` 시작 확인

---

## Task 4: 3 라우터 스텁 파일 생성

**Files:**
- Create: `demo/api/src/routes/users.js`
- Create: `demo/api/src/routes/products.js`
- Create: `demo/api/src/routes/orders.js`

- [ ] **Step 1: users.js 스텁**

Create `demo/api/src/routes/users.js`:

```javascript
import { Router } from 'express';

const router = Router();

// Subagent (users)가 여기를 채움 — GET / + POST /

export default router;
```

- [ ] **Step 2: products.js 스텁**

Create `demo/api/src/routes/products.js`:

```javascript
import { Router } from 'express';

const router = Router();

// Subagent (products)가 여기를 채움 — GET / + POST /

export default router;
```

- [ ] **Step 3: orders.js 스텁**

Create `demo/api/src/routes/orders.js`:

```javascript
import { Router } from 'express';

const router = Router();

// Subagent (orders)가 여기를 채움 — GET / + POST /

export default router;
```

- [ ] **Step 4: 모두 확인**

Run: `ls demo/api/src/routes/`
Expected: `orders.js  products.js  users.js`

---

## Task 5: 3 테스트 스텁 파일 생성

**Files:**
- Create: `demo/api/tests/users.test.js`
- Create: `demo/api/tests/products.test.js`
- Create: `demo/api/tests/orders.test.js`

- [ ] **Step 1: users.test.js 스텁**

Create `demo/api/tests/users.test.js`:

```javascript
import { test } from 'node:test';

test.skip('users endpoints — to be implemented by subagent', () => {});
```

- [ ] **Step 2: products.test.js 스텁**

Create `demo/api/tests/products.test.js`:

```javascript
import { test } from 'node:test';

test.skip('products endpoints — to be implemented by subagent', () => {});
```

- [ ] **Step 3: orders.test.js 스텁**

Create `demo/api/tests/orders.test.js`:

```javascript
import { test } from 'node:test';

test.skip('orders endpoints — to be implemented by subagent', () => {});
```

- [ ] **Step 4: 확인**

Run: `ls demo/api/tests/`
Expected: `orders.test.js  products.test.js  users.test.js`

---

## Task 6: npm install + 서버 부트 검증

**Files:** (수정 없음, 환경 셋업)

- [ ] **Step 1: npm install**

Run: `cd demo/api && npm install`
Expected: `node_modules/`가 생성됨, 경고는 가능, 에러는 없음. 끝에 `added N packages` 출력.

- [ ] **Step 2: 서버 부트 검증 (백그라운드 실행 → 즉시 종료)**

Run:
```bash
cd demo/api && timeout 2 node src/index.js || echo "server started ok"
```
Expected: `API listening on http://localhost:3737` 출력 후 timeout으로 종료. `server started ok` 출력.

- [ ] **Step 3: 빈 라우터 응답 확인 (서버 띄우고 curl)**

Run:
```bash
cd demo/api && node src/index.js &
SERVER_PID=$!
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3737/users
kill $SERVER_PID 2>/dev/null
```
Expected: `404` 출력 (스텁 라우터에 핸들러 없으니 정상)

---

## Task 7: demo/api git 초기화 + 초기 커밋

**Files:** (메타 — git repo 상태)

- [ ] **Step 1: git init**

Run: `cd demo/api && git init -b main`
Expected: `Initialized empty Git repository in .../demo/api/.git/`

- [ ] **Step 2: 모두 스테이징**

Run: `cd demo/api && git add .`

- [ ] **Step 3: 스테이징 확인 — node_modules 제외됐는지**

Run: `cd demo/api && git status --short | head -20`
Expected: `A .gitignore`, `A package.json`, `A src/...`, `A tests/...`만. **`node_modules/`는 안 보여야 함**.

- [ ] **Step 4: 초기 커밋**

Run:
```bash
cd demo/api && git -c user.email=demo@local -c user.name=Demo commit -m "chore: initial scaffold with stub routers and tests"
```
Expected: `[main (root-commit) ...] chore: initial scaffold with stub routers and tests`

- [ ] **Step 5: 로그 확인**

Run: `cd demo/api && git log --oneline`
Expected: 1개 커밋. `chore: initial scaffold with stub routers and tests`

---

## Task 8: demo/CLAUDE.md — 오케스트레이터 룰 작성

**Files:**
- Create: `demo/CLAUDE.md`

- [ ] **Step 1: CLAUDE.md 작성**

Create `demo/CLAUDE.md`:

````markdown
# Demo: 오케스트레이터 패턴 룰

이 파일은 메인 Claude 세션이 라이브 데모를 진행할 때 따를 오케스트레이션 룰이다.
`demo/prompts/run-demo.md`의 작업 명세와 함께 사용된다.

## 역할

너는 **오케스트레이터**다. 직접 코드를 작성하지 않는다. 작업을 분해하고, 서브에이전트에 위임하고, 결과를 검토하고, 머지를 결정한다.

## 절차 (이 순서로 진행)

### 1. 컨텍스트 로딩

- `demo/prompts/run-demo.md`를 읽어서 작업 N개 식별 (각 작업 = 한 엔드포인트 구현)
- 작업 디렉터리는 `demo/api/`. 모든 git 명령은 이 디렉터리에서 실행.

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

각 Task tool 호출에 다음을 포함:
- `subagent_type`: `general-purpose`
- `isolation`: `"worktree"`
- `description`: 짧은 한 줄
- `prompt`: 다음 골격을 따른다 (각 엔드포인트별로 채워서)

```
너는 demo/api/ 의 worktree에서 작업한다. 다음 한 가지 엔드포인트만 구현한다:

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
cd demo/api && git worktree list
```

결과를 사용자에게 보여주고 코멘트: "3개 worktree가 격리된 상태로 살아있음."

### 5. 머지 시퀀스 (각 worktree마다 반복)

**Task tool 반환값에서 worktree path와 branch 추출**: `isolation: "worktree"`로 호출한 Task tool은 결과에 worktree 경로와 브랜치 이름을 반환한다. 이 값들을 그대로 사용한다 (추측 금지).

각 성공한 worktree에 대해 다음을 순차적으로:

1. diff 출력 (메인 디렉터리 기준, 반환받은 브랜치 이름 사용):
   ```bash
   cd demo/api && git diff main..<RETURNED_BRANCH_NAME>
   ```

2. 사용자에게 명시적으로 묻기: **"`<RETURNED_BRANCH_NAME>` 머지 진행할까요?"** 그리고 사용자 응답을 **반드시 기다림**. yes 받기 전 머지 금지.

3. 사용자가 yes 답하면:
   ```bash
   cd demo/api && git merge <RETURNED_BRANCH_NAME> --no-ff -m "merge: <ENDPOINT_NAME> endpoint"
   ```

### 6. 최종 그래프

```bash
cd demo/api && git log --oneline --all --graph
```

### 7. 검증

```bash
bash demo/scripts/verify.sh
```

출력에서 6개 curl이 모두 200 또는 201인지 확인.

### 8. Worktree 정리

각 worktree 제거 (Task tool에서 반환받은 path 사용):
```bash
cd demo/api && git worktree remove <RETURNED_WORKTREE_PATH> 2>/dev/null || true
```

브랜치도 정리:
```bash
cd demo/api && git branch -d <RETURNED_BRANCH_NAME> 2>/dev/null || true
```

### 9. 시각화 ② (cleanup 확인)

```bash
cd demo/api && git worktree list
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
````

- [ ] **Step 2: 파일 확인**

Run: `wc -l demo/CLAUDE.md`
Expected: 100줄 이상 (대략 100–130줄)

---

## Task 9: demo/prompts/run-demo.md — 작업 명세 작성

**Files:**
- Create: `demo/prompts/run-demo.md`

- [ ] **Step 1: 폴더 생성**

```bash
mkdir -p demo/prompts
```

- [ ] **Step 2: run-demo.md 작성**

Create `demo/prompts/run-demo.md`:

````markdown
# 데모 작업 명세 — 3 엔드포인트

이 파일은 오케스트레이터(메인 Claude)가 N개 작업으로 분해할 명세다.

## 작업 1: /users

**라우터 파일**: `src/routes/users.js`
**스토어 파일**: `src/stores/users.js` (새로 생성)
**테스트 파일**: `tests/users.test.js` (스텁 교체)

### 동작
- `GET /users` → 200, 모든 user 배열 반환 (`[{id, name, email}, ...]`)
- `POST /users` → 201, 생성된 user 반환. 입력은 `{name, email}`. id는 자동 (예: `u-1`, `u-2`)
- 검증: name, email 둘 다 문자열 + 비어있지 않음. 누락 시 400 + `{error: "..."}`

### 메모리 저장소
- 배열 1개 + 카운터 1개
- `add({name, email})` → user 객체 반환
- `list()` → 배열 반환

### 테스트 (최소 2개)
1. GET 빈 목록 → 200, []
2. POST 1개 → 201, GET → [user]

---

## 작업 2: /products

**라우터 파일**: `src/routes/products.js`
**스토어 파일**: `src/stores/products.js` (새로 생성)
**테스트 파일**: `tests/products.test.js` (스텁 교체)

### 동작
- `GET /products` → 200, 모든 product 배열 반환 (`[{id, name, price}, ...]`)
- `POST /products` → 201, 생성된 product 반환. 입력은 `{name, price}`. id 자동 (`p-1`, `p-2`).
- 검증: name 문자열 비어있지 않음, price 숫자 ≥ 0. 위반 시 400.

### 메모리 저장소
- 배열 1개 + 카운터 1개
- `add({name, price})` / `list()`

### 테스트 (최소 2개)
1. GET 빈 목록 → 200, []
2. POST 1개 → 201, GET → [product]

---

## 작업 3: /orders

**라우터 파일**: `src/routes/orders.js`
**스토어 파일**: `src/stores/orders.js` (새로 생성)
**테스트 파일**: `tests/orders.test.js` (스텁 교체)

### 동작
- `GET /orders` → 200, 모든 order 배열 반환 (`[{id, productId, qty}, ...]`)
- `POST /orders` → 201, 생성된 order 반환. 입력은 `{productId, qty}`. id 자동 (`o-1`).
- 검증: productId 문자열 비어있지 않음, qty 정수 ≥ 1. 위반 시 400.

### 메모리 저장소
- 배열 1개 + 카운터 1개
- `add({productId, qty})` / `list()`

### 테스트 (최소 2개)
1. GET 빈 목록 → 200, []
2. POST 1개 → 201, GET → [order]

---

## 공통 제약 (모든 작업)

- ESM (`import` / `export default`)
- `node --test`로 실행 가능
- supertest 사용 금지 (deps 추가 안 함). 대신 `app.handle()` 또는 Node 18+ 내장 fetch + listen 패턴
- `src/index.js` **절대 수정 금지** (사전 마운트됨)
- 다른 작업의 라우터/스토어/테스트 파일 **절대 만지지 말 것**
````

- [ ] **Step 3: 파일 확인**

Run: `wc -l demo/prompts/run-demo.md`
Expected: 70–90줄 정도

---

## Task 10: demo/scripts/reset.sh

**Files:**
- Create: `demo/scripts/reset.sh`

- [ ] **Step 1: 폴더 생성**

```bash
mkdir -p demo/scripts
```

- [ ] **Step 2: reset.sh 작성**

Create `demo/scripts/reset.sh`:

```bash
#!/usr/bin/env bash
# 데모 상태를 클린한 초기 상태로 복원
# - 모든 worktree 강제 제거
# - api/를 최초 커밋으로 hard reset
# - main 외 모든 브랜치 삭제

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/../api"

cd "$API_DIR"

echo "→ Removing all worktrees except main..."
# git worktree list 출력에서 메인 디렉터리 제외하고 모두 제거
MAIN_PATH="$(pwd)"
git worktree list --porcelain | awk '/^worktree/ {print $2}' | while read -r wt_path; do
  if [ "$wt_path" != "$MAIN_PATH" ]; then
    echo "  removing: $wt_path"
    git worktree remove --force "$wt_path" 2>/dev/null || true
  fi
done

# Pruned worktree 제거
git worktree prune

echo "→ Resetting to initial commit..."
INITIAL_COMMIT="$(git log --reverse --format='%H' | head -1)"
git checkout main 2>/dev/null || git checkout -b main
git reset --hard "$INITIAL_COMMIT"

echo "→ Deleting non-main branches..."
git branch | sed 's/^[* ]*//' | while read -r branch; do
  if [ "$branch" != "main" ] && [ -n "$branch" ]; then
    echo "  deleting: $branch"
    git branch -D "$branch" 2>/dev/null || true
  fi
done

echo "✅ Demo state reset"
echo ""
echo "Final state:"
git worktree list
echo ""
git log --oneline
```

- [ ] **Step 3: 실행 권한 부여**

Run: `chmod +x demo/scripts/reset.sh`

- [ ] **Step 4: 첫 실행 — 클린 상태에서도 안전한지 확인**

Run: `bash demo/scripts/reset.sh`
Expected:
```
→ Removing all worktrees except main...
→ Resetting to initial commit...
HEAD is now at <hash> chore: initial scaffold with stub routers and tests
→ Deleting non-main branches...
✅ Demo state reset

Final state:
worktree <abs path>  <hash> [main]

<hash> chore: initial scaffold with stub routers and tests
```

---

## Task 11: demo/scripts/verify.sh

**Files:**
- Create: `demo/scripts/verify.sh`

- [ ] **Step 1: verify.sh 작성**

Create `demo/scripts/verify.sh`:

```bash
#!/usr/bin/env bash
# 3 엔드포인트 × (POST + GET) = 6개 curl 검증
# 전제: 라우터들이 모두 구현 완료된 상태 (서브에이전트 작업 + 머지 후)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/../api"
PORT=3737

cd "$API_DIR"

# 서버 백그라운드 실행
PORT=$PORT node src/index.js &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

# 서버 부팅 대기
sleep 1

# 부팅 확인
if ! curl -sf -o /dev/null "http://localhost:$PORT/users"; then
  echo "❌ Server didn't boot on port $PORT"
  exit 1
fi

echo ""
echo "─── /users ───"
curl -sf -X POST "localhost:$PORT/users" \
  -H 'Content-Type: application/json' \
  -d '{"name":"alice","email":"a@x.com"}'
echo ""
curl -sf "localhost:$PORT/users"
echo ""

echo ""
echo "─── /products ───"
curl -sf -X POST "localhost:$PORT/products" \
  -H 'Content-Type: application/json' \
  -d '{"name":"widget","price":42}'
echo ""
curl -sf "localhost:$PORT/products"
echo ""

echo ""
echo "─── /orders ───"
curl -sf -X POST "localhost:$PORT/orders" \
  -H 'Content-Type: application/json' \
  -d '{"productId":"p-1","qty":2}'
echo ""
curl -sf "localhost:$PORT/orders"
echo ""

echo ""
echo "✅ All 6 calls passed"
```

- [ ] **Step 2: 실행 권한 부여**

Run: `chmod +x demo/scripts/verify.sh`

- [ ] **Step 3: 스모크 테스트 — 빈 라우터 상태에서 실행 → 실패 기대**

Run: `bash demo/scripts/verify.sh; echo "exit=$?"`
Expected: 첫 번째 POST에서 404로 `set -e`가 발동, `exit=22` 또는 비-0. 정상 (라우터 구현 안 됐으니 실패해야 함).

이 스모크 테스트는 verify.sh가 **잘못된 상태에서 실패한다**는 것을 확인한다 (false positive 방지). 실제 검증은 라이브 데모 끝에서 수행됨.

---

## Task 12: demo/README.md — 발표자 큐 카드

**Files:**
- Create: `demo/README.md`

- [ ] **Step 1: README.md 작성**

Create `demo/README.md`:

````markdown
# 오케스트레이터 데모 — 발표자 가이드

라이브 데모: 메인 Claude Code 세션이 3 서브에이전트를 worktree에 spawn → 머지 → 검증.

**소요 시간**: 8–10분
**관련 슬라이드**: 02-13 (직전), 02-14 (이 데모), 02-15 (직후)

---

## 사전 점검 체크리스트

### 24시간 전
- [ ] `cd demo/api && npm install` 완료 (오프라인 대비)
- [ ] `bash demo/scripts/reset.sh` 정상 실행
- [ ] 풀 데모 1회 리허설 — 시간 측정 및 메인 에이전트 행동 확인
- [ ] 포트 3737 충돌 없음 확인 (Linux/Mac: `lsof -i:3737`, Windows: `netstat -ano | findstr 3737`)
- [ ] Claude Code 인증 갱신
- [ ] `git --version` ≥ 2.28 (worktree 풀 기능 + `init -b main` 지원)

### 5분 전
- [ ] `bash demo/scripts/reset.sh` 마지막 실행 (클린 상태 보장)
- [ ] Claude Code 새 세션 (이전 컨텍스트 안 섞이게)
- [ ] 터미널 폰트 확대 (뒷자리 가독성)
- [ ] 직전 슬라이드(02-13) 띄워두기

---

## 라이브 큐 카드 (발표자가 칠 명령들)

### 단계 0 — 셋업 노출 (0:00–0:30)

```bash
cd demo/api
git log --oneline
cat ../CLAUDE.md | head -30
cat ../prompts/run-demo.md | head -30
```

코멘트: "초기 상태 — 커밋 1개, 룰과 명세는 이렇게 분리돼있다."

### 단계 1 — 메인 Claude 부팅 (0:30)

```bash
cd ..  # 프로젝트 루트로
claude
```

### 단계 2 — 트리거 (0:45)

Claude Code 입력창에 한 줄:

```
demo/CLAUDE.md의 오케스트레이터 룰을 따라 demo/prompts/run-demo.md의 작업을 실행해줘.
```

### 단계 3 — 대기 (1:30–4:30)

메인 세션이 3개 Task tool을 한 메시지에 호출. 발표자는 코멘트 기회:

> "지금 3개 서브에이전트가 각자 격리된 worktree에서 동시에 작업 중. 직렬이면 ~9분 걸렸을 작업이 ~3분에 끝납니다."

### 단계 4 — 머지 일시정지 ×3 (4:45–6:30)

메인이 각 worktree마다 diff 출력 후 "머지할까요?" 물음.
**발표자가 명시적으로 yes 답** (한 번씩, 총 3번).

각 yes 사이에 코멘트:

> "여기서 머지는 자동이 아닙니다. 메인 에이전트가 묻고, 사람이 결정. 슬라이드 02-12에서 본 것처럼."

### 단계 5 — 검증 (6:45)

메인이 `bash demo/scripts/verify.sh` 자동 실행.
6개 curl 결과가 모두 200/201로 출력됨.

### 단계 6 — 회고 (8:00–9:00)

```bash
cd demo/api && git log --oneline --all --graph
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
````

- [ ] **Step 2: 파일 확인**

Run: `wc -l demo/README.md`
Expected: 100줄 이상

---

## Task 13: 풀 스택 정합성 dry-run

**Files:** (수정 없음, E2E 스모크)

이 단계는 자동화 불가능 — Claude Code 메인 세션을 직접 띄워서 오케스트레이터 룰이 의도대로 작동하는지 사람이 확인.

- [ ] **Step 1: reset 실행**

Run: `bash demo/scripts/reset.sh`
Expected: ✅ 메시지 + main만 보임

- [ ] **Step 2: 메인 Claude Code 띄우기**

Run (새 Git Bash 터미널 또는 PowerShell):
```bash
# Git Bash
cd /d/lg/work/SLS/seminar/vibe-coding-seminar && claude

# 또는 PowerShell
cd D:\lg\work\SLS\seminar\vibe-coding-seminar; claude
```

- [ ] **Step 3: 트리거 입력**

입력:
```
demo/CLAUDE.md의 오케스트레이터 룰을 따라 demo/prompts/run-demo.md의 작업을 실행해줘.
```

- [ ] **Step 4: 관찰 항목 (체크리스트)**

수동으로 확인:
- [ ] 메인이 두 파일을 읽었는가
- [ ] 메인이 계획을 발표했는가 (3 작업)
- [ ] 메인이 단일 메시지에 Task tool 3개 호출했는가 (한 응답에 3 tool_use 블록)
- [ ] 각 호출에 `isolation: "worktree"` 포함됐는가
- [ ] 모든 서브가 완료 후 메인이 `git worktree list` 실행했는가
- [ ] 메인이 각 머지 전 사용자에게 **명시적으로 물었는가** (자동 머지 안 했는가)
- [ ] 마지막에 verify.sh 실행했는가
- [ ] worktree 정리 후 `git worktree list`로 cleanup 보여줬는가

- [ ] **Step 5: 어긋난 부분이 있으면 demo/CLAUDE.md 수정**

발견된 어긋남에 따라 룰 강화. 흔한 수정:
- 메인이 머지 자동 진행 → "**반드시 사용자 응답을 기다림. yes 받기 전 머지 금지**" 강조
- 메인이 코드 본문 출력 → "**서브가 반환한 코드 본문을 다시 출력 금지**" 강조
- 메인이 isolation 누락 → "**isolation: \"worktree\" 없이 Task tool 호출 금지**" 강조

수정 후 reset.sh + 재실행으로 검증 반복.

- [ ] **Step 6: 성공 기준**

위 8개 관찰 항목이 모두 ✓ 되면 데모 준비 완료.

---

## 완료 후 다음 단계 (이 plan 범위 밖)

1. 슬라이드 02-14 정렬 결정 (spec §8 참조 — 옵션 A/B/C 중 선택)
2. 슬라이드 02-13의 "AGENTS.md (또는 메인 CLAUDE.md)" → CLAUDE.md로 통일 (메모리에 사용자 선호도 저장됨)
3. 발표 24시간 전 사전 점검 체크리스트 실행
4. 발표 5분 전 reset.sh 실행 + 새 세션
