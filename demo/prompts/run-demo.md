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
- 테스트 추가 권장 (필수는 아님): POST 검증 실패 케이스 1개 (예: 필수 필드 누락 → 400)

---

## 공통 형식 예시 (모든 엔드포인트 동일 패턴)

### 성공 응답
```json
// POST 응답 (예: /products)
{ "id": "p-1", "name": "Widget", "price": 9.99 }

// GET 응답
[ { "id": "p-1", "name": "Widget", "price": 9.99 } ]
```

### 검증 실패 응답
```json
// 필수 필드 누락 시
{ "error": "name is required" }

// 타입 위반 시
{ "error": "price must be a number >= 0" }
```

### 검증 규칙 (모든 작업 공통)
- 문자열 필드 "비어있지 않음" = `typeof v === 'string' && v.trim().length > 0`
- 숫자 필드 ≥ 0 = `typeof v === 'number' && v >= 0`
- 정수 필드 ≥ 1 = `Number.isInteger(v) && v >= 1` (소수점 거부)
- productId 검증 = 비어있지 않은 문자열 (다른 store와의 cross-reference 검증은 **하지 않음**)
