# RAG 보너스 섹션 (RAG 가시화 세미나) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 세미나에 RAG 보너스 섹션(~22 슬라이드, 3편: 개념·에이전틱·Graph)을 추가하고, 발표자가 만든 BMS HVAC RAG 가시화 작업을 개념마다 1:1 실제 값으로 엮는다.

**Architecture:** reveal.js `<section>` HTML 슬라이드. `slides/04-01/02/03.md` 3파일(각 여러 `<section>`). `index.html`에 3파일 이미 등록됨 → 파일 생성만으로 Load error 해소. 도식은 Mermaid·인라인 SVG·box 그리드·표. 모든 BMS 수치는 spec의 SoT 섹션에서만 인용.

**Tech Stack:** Reveal.js 5.1, Mermaid 10, 커스텀 CSS(`assets/css/base.css` 클래스), Pretendard/JetBrains Mono. 빌드 없음 — `python -m http.server 8000`로 렌더.

**SoT:** 콘텐츠/수치 = [spec](../specs/2026-05-27-rag-visualization-seminar-design.md). 형식 = 프로젝트 [CLAUDE.md](../../../CLAUDE.md).

---

## 공통 형식 (전 Task 적용 — DRY)

### `<section>` 템플릿
```html
<section data-section="rag" id="rag-<주제>">
  <h2>슬라이드 제목</h2>
  <div class="content"><!-- box/표/mermaid/svg --></div>
  <aside class="notes">발표자 노트: 강조 포인트</aside>
</section>
```
- 파일 = `<section>` 여러 개를 줄바꿈으로 이어 붙임(마크다운 파싱 없음, `data-markdown` 금지).
- 각 `<section>`에 고유 `id`(예: `rag-why`)와 `data-section="rag"`.

### CSS 클래스 치트시트 (기존 것만 사용, 새 클래스 금지)
| 클래스 | 용도 |
|---|---|
| `.box` / `.box-title` | 카드형 박스(그리드 셀). 강조 시 `style="border-left-color: var(--accent-secondary)"` |
| `.lead` | 슬라이드 도입 한 줄(큰 글씨) |
| `.callout` | 하단 핵심 요약 한 줄 |
| `.kw` | 인라인 키워드 강조(mono) |
| `.source` (`<small>`) | 출처 표기 |
| 변수 | `var(--space-xs/sm/md)`, `var(--accent-primary/secondary)`, `var(--bg-tertiary)`, `var(--font-mono)` |
- 그리드: `<div style="display:grid; grid-template-columns:repeat(N,1fr); gap:var(--space-sm)">`.

### Mermaid 도식
```html
<div class="mermaid">
graph LR
  A[노드] --> B[노드]
</div>
```
- `index.html`이 `mermaid.run()`을 슬라이드 전환 시 호출하므로 추가 설정 불필요.

### 톤·금지 (CLAUDE.md)
- 시니어 동료 톤. 가르치려 들지 않기. 이모지 절제. "그러므로/따라서"로 시작 금지.
- 한국어 본문 + 영어 기술 용어 혼용. 텍스트 적게·도식 우선. 16:9에서 안 깨지게(한 슬라이드 핵심 1개).
- **다삼솔루션 언급 절대 금지.**
- 출처 있는 주장은 `<small class="source">— 출처</small>`, `references.md`에 등재.

---

## File Structure

| 파일 | 역할 |
|---|---|
| `slides/04-01-rag-concepts.md` (생성) | 개념편 10 `<section>` (왜·흐름·컴포넌트·청킹·임베딩·검색·생성·가시화종합·안전장치) |
| `slides/04-02-rag-agentic.md` (생성) | 에이전틱편 6 `<section>` (Naive 한계·Agentic·ReAct·LangGraph·확장상상·정리) |
| `slides/04-03-rag-graph.md` (생성) | Graph편 6 `<section>` (벡터한계·지식그래프·GraphRAG·전체지도·로드맵·출처) |
| `docs/outline.md` (수정) | 끝에 RAG 보너스 섹션 흐름 추가 |
| `docs/references.md` (수정) | RAG 출처 추가 |
| `index.html` (수정, 선택) | RAG_SLIDE 주석 번호만 실제 슬라이드 수에 맞춤(등록 배열은 이미 정확) |

> `index.html`의 `SLIDE_FILES`에 `04-01/02/03`이 이미 있으므로 **배열 수정 불필요**. 파일만 만들면 렌더된다.

---

## Task 1: 04-01 개념편 (10 슬라이드)

**Files:** Create `slides/04-01-rag-concepts.md`

각 `<section>`을 아래 명세대로 작성. `id`는 표의 값 사용. 모든 BMS 수치는 spec SoT 인용.

- [ ] **Step 1: S1 `rag-why` — 왜 RAG인가**
  - 메시지: LLM 단독의 4가지 구멍 — 환각 / 최신성(학습 컷오프) / 출처 없음 / **사내·도메인 문서를 모름**.
  - 도식: 2열 box 비교 — "LLM 단독" vs "LLM + RAG". 각 box에 위 항목 ✗/✓.
  - `[BMS]` callout: "냉매가 새는데 어떻게 대처하죠?" → 일반 LLM은 우리 장비 문서(E-3002)를 모른다.
  - 노트: 파인튜닝과 대비 — RAG는 지식을 모델 밖에 두고 주입. 비용·갱신·출처에서 유리.

- [ ] **Step 2: S2 `rag-oneline` — RAG 한 문장 + 비유**
  - 메시지: Retrieval-Augmented Generation = **답하기 전에 관련 문서를 찾아 함께 넣어주는 것**.
  - 도식: 비유 box — "닫힌 책 시험(LLM 단독)" vs "오픈북 시험(RAG)". 큰 `.lead`로 한 문장.
  - 노트: "검색(retrieval)으로 보강(augment)한 생성(generation)" 분해.

- [ ] **Step 3: S3 `rag-flow` — 동작 흐름 전체 (핵심)**
  - 도식: Mermaid 2-track.
```
graph LR
  subgraph IDX["색인 · offline (1회/문서 갱신 시)"]
    D[문서] --> C[청크 분할] --> E1[임베딩] --> V[(벡터 DB)]
  end
  subgraph QRY["질의 · online (질문마다)"]
    Q[질문] --> E2[임베딩] --> S[유사도 검색] --> P[프롬프트 조립] --> L[LLM] --> A[답변+출처]
  end
  V -. 검색 대상 .-> S
```
  - `[BMS]` 캡션: 색인 = 문서 7종 → 37청크 / 질의 = "냉매가 새는 것 같아요" → E-3002 답변.
  - 노트: 색인은 미리(offline), 질의는 매번(online). 임베딩이 양쪽에 같은 모델로 쓰인다는 점 강조.

- [ ] **Step 4: S4 `rag-components` — 기술 컴포넌트 지도**
  - 도식: 5칸 box 그리드 — ① 임베딩 모델 ② 벡터 DB ③ 검색(유사도) ④ LLM ⑤ 오케스트레이션. 각 box 하단에 `[BMS]` 매핑:
    - ① OpenAI text-embedding-3-large
    - ② Supabase pgvector
    - ③ match_documents (코사인 Top-K)
    - ④ GPT-4o
    - ⑤ Activepieces(가시화) / FastAPI(실제 봇)
  - 노트: 컴포넌트는 갈아끼움 가능(임베딩 모델·벡터 DB·LLM 모두 교체 가능). 인터페이스가 핵심.

- [ ] **Step 5: S5 `rag-chunking` — 청킹**
  - 메시지: 왜 자르나 — ① 검색 정밀도(문서 통째는 노이즈) ② 임베딩 입력 한계 ③ LLM 컨텍스트 절약.
  - 도식: 문서 1개 → 섹션별 청크 N개 분해 box 다이어그램.
  - `[BMS]`: `##` 마크다운 섹션 단위로 분할. **일화** — P-1001(필터)에 `## 증상` 섹션이 없어 "바람이 약해요" 검색 실패 → 증상 섹션 추가 후 recall 90%→100%. "청킹 설계가 검색 품질을 좌우".
  - 노트: 청크 크기·경계 트레이드오프. 의미 단위(섹션) 청킹이 토큰 고정 청킹보다 품질 좋은 경우.

- [ ] **Step 6: S6 `rag-embedding` — 임베딩**
  - 메시지: 텍스트 → 고정 길이 숫자 벡터. 의미가 가까우면 벡터도 가깝다.
  - 도식: 인라인 SVG — 2D 의미 공간에 점들("냉매 누출"·"필터 막힘"·"점심 메뉴")을 배치, 가까운 것끼리 군집. (SVG `<circle>`+`<text>`, 좌표는 의미 근접도 반영.)
  - `[BMS]`: text-embedding-3-large **@ 1536차원**(기본 3072 아님 — 차원 고정 계약). 노드2 실제 출력 = 숫자 1536개 배열(앞 5개만 보여주고 `…`).
  - 노트: 차원이 의미 해상도. 같은 모델·차원으로 색인/질의 해야 함(불일치 시 검색 깨짐).

- [ ] **Step 7: S7 `rag-search` — 벡터 검색 (BMS 하이라이트)**
  - 메시지: 질문 벡터와 청크 벡터의 **코사인 유사도** Top-K. threshold 미만은 버림.
  - 도식: 인라인 SVG 코사인(두 벡터 사이 각) 작게 + **BMS 유사도 표**:
    | 순위 | 청크 | 유사도 |
    |---|---|---|
    | 1 | P-1001 / 증상 | 0.391 |
    | 2 | E-3002 / 가능한 원인 | 0.370 |
    | 3 | M-2001 / 정기 점검 | 0.367 |
    | 4 | E-3002 / 즉각 조치 | 0.357 |
    | 5 | P-1001 / 비고 | 0.354 |
  - `.callout`: 질문은 "냉매가 **새는**"인데 1위가 **필터(P-1001)** — 키워드가 아니라 **의미**로 찾기 때문. (strict threshold 0.34)
  - 노트: 키워드 검색이면 "냉매"=E-3002가 1위여야. 임베딩은 "증상·이상" 맥락으로 P-1001을 끌어올림. Top-K로 E-3002도 함께 들어와 답변 근거가 됨.

- [ ] **Step 8: S8 `rag-generate` — 프롬프트 조립 + 생성·인용**
  - 메시지: 검색 청크를 컨텍스트로 묶어 LLM에 전달 → 답변 + 근거 인용.
  - 도식: 코드블록(JSON, 14줄 이하) — system + user(검색 청크 N개를 chunk_id와 함께) 메시지 골격.
  - `[BMS]`: 노드4가 5청크를 `chunk_id=0..4`로 조립 → 노드5(gpt-4o, temp0) → 답변 = E-3002 원인 3개 + 점검 3개, 각 주장에 `[chunk_id=N]` 인용. **검색 1위 P-1001이 아니라 질문에 맞는 E-3002를 LLM이 선택**.
  - 노트: chunk_id 인용이 환각 억제·출처 추적의 핵심. LLM이 검색 상위를 맹종하지 않고 맥락 선택.

- [ ] **Step 9: S9 `rag-viz` — 내가 만든 5노드 가시화 (결정5)**
  - 메시지: RAG를 블랙박스로 두지 않고 임베딩→검색→LLM을 **보이는 노드**로 펼침.
  - 도식: Mermaid 체인 — `Webhook[질문] --> EMB[HTTP 임베딩] --> SRCH[HTTP 검색 match_documents] --> ASM[Code 조립] --> LLM[HTTP LLM]`. 각 노드 아래 한 줄(무엇이 보이나: 1536벡터 / 유사도표 / 프롬프트 / 답변).
  - `.callout`: Activepieces 캔버스에서 각 노드를 클릭하면 실제 중간 데이터가 보인다 — "코드가 하는 일을 눈으로".
  - 노트: 학습 목적. 실제 봇은 한 번의 함수 호출(FastAPI), 가시화는 같은 RAG를 단계별로 펼친 별도 플로우. 검증: 노드3 유사도 0.3704 = 실제 코드 CLI 0.370 일치.

- [ ] **Step 10: S10 `rag-safety` — RAG의 안전장치**
  - 메시지: 검색됐다고 다 믿지 않는다 — threshold gate + 사후 가드 + 근거없음 응답.
  - 도식: 3칸 box — ① gate(strict 0.34→widen 0.30→없으면 근거없음) ② 가드 5종(가짜인용0·인용100%·제어지시0·원인후보≤3·no_basis일관성) ③ 위반 시 1회 재생성→근거없음.
  - `[BMS]`: 가시화 플로우는 happy path만(가드 제외). **실제 봇은 가드가 2차 방어** — "압축기를 멈추세요" 같은 제어 지시를 차단(환각0·제어지시0). 가시화에서 본 chunk_id=3 "운전 중지"를 LLM이 인용 안 한 것도 이 규칙.
  - 노트: RAG의 신뢰성은 검색이 아니라 "안 믿는 장치"에서 온다. 이게 데모와 프로덕션의 차이.

- [ ] **Step 11: 렌더 확인 + Commit**
  - 파일 저장 후 Task 5에서 일괄 렌더. 여기선 `<section>` 10개·각 `id` 고유·태그 닫힘만 점검.
  - Commit: `git add slides/04-01-rag-concepts.md` → `git commit -m "feat(rag): 04-01 개념편 10슬라이드 (RAG 흐름·컴포넌트·BMS 사례)"`

---

## Task 2: 04-02 에이전틱편 (6 슬라이드)

**Files:** Create `slides/04-02-rag-agentic.md`

- [ ] **Step 1: S11 `rag-naive-limit` — Naive RAG의 한계**
  - 메시지: 검색 1번 → 생성 1번의 선형 파이프라인. 약점 — 모호한 질문, 다단계, 검색 실패 시 복구 없음.
  - 도식: 직선 흐름(검색→생성) + ✗ 표시 3개(재시도 없음·쿼리 고정·1회 검색).
  - `[BMS]`: 내 5노드 플로우가 정확히 이 Naive RAG. "한 방에 안 되면 그냥 근거없음".
  - 노트: 대부분의 첫 RAG가 여기. 충분한 경우도 많음(YAGNI). 다음 슬라이드는 "부족할 때".

- [ ] **Step 2: S12 `rag-agentic` — Agentic RAG**
  - 메시지: LLM이 **스스로 판단** — 검색할지, 다시 검색할지, 쿼리를 고쳐 쓸지, 도구를 쓸지.
  - 도식: box 비교 — Naive(고정 파이프라인) vs Agentic(LLM이 루프 제어). 핵심 동사: 판단·재검색·쿼리 재작성.
  - 노트: "검색을 코드가 시키는가, LLM이 시키는가"의 차이. 비용↑·지연↑ 대신 어려운 질문 대응.

- [ ] **Step 3: S13 `rag-react` — ReAct 패턴**
  - 도식: Mermaid 루프.
```
graph TD
  T[Thought 생각] --> A[Action 검색/도구]
  A --> O[Observation 결과]
  O --> T
  O --> F[충분하면 최종 답변]
```
  - 메시지: Reason + Act 교차. 생각→행동→관찰을 충분할 때까지 반복.
  - `<small class="source">— Yao et al., ReAct (2022)</small>`
  - 노트: Agentic RAG의 대표 루프. "관찰 보고 다음 행동 결정"이 핵심. 무한 루프 방지(최대 스텝).

- [ ] **Step 4: S14 `rag-frameworks` — LangChain / LangGraph**
  - 메시지: 에이전틱 RAG를 코드로 짜는 프레임워크. LangChain=체인 추상, LangGraph=상태 그래프(분기·루프·재시도).
  - 도식: 2열 box — LangChain(선형 체인) / LangGraph(그래프, 노드+엣지+상태).
  - `[BMS]`: 내 Activepieces는 **노코드 오케스트레이션**. 같은 그래프 개념을 LangGraph는 코드로, Activepieces는 캔버스로. 가시화 목적엔 노코드가 직관적.
  - `<small class="source">— LangChain / LangGraph 공식 문서</small>`
  - 노트: 프레임워크 락인 주의. 개념(그래프·상태·도구)을 알면 도구는 갈아끼움.

- [ ] **Step 5: S15 `rag-agentic-bms` — 내 플로우를 에이전틱하게 확장하면?**
  - 도식: 내 5노드 Mermaid에 **판단 노드 추가** — LLM 답변 후 "근거 충분?" 분기 → 부족하면 쿼리 재작성→재검색 루프백.
```
graph LR
  Q[질문] --> E[임베딩] --> S[검색] --> L[LLM]
  L --> J{근거 충분?}
  J -- 예 --> A[답변]
  J -- 아니오 --> R[쿼리 재작성] --> E
```
  - `[BMS]`: 현재는 `J`가 없음(Naive). 추가하면 "냉매 누출 + 필터" 복합 질문에 재검색 가능.
  - 노트: 가시화 플로우의 자연스러운 다음 진화. 단 비용·지연·무한루프 가드 필요.

- [ ] **Step 6: S16 `rag-agentic-when` — 언제 Agentic가 필요한가 + Commit**
  - 도식: box 체크리스트 — 필요(다단계 추론·모호한 질문·도구 호출·검색 품질 불안정) vs 과함(단순 FAQ·명확한 단일 검색).
  - `.callout`: 대부분 Naive로 시작 → 한계 만나면 Agentic. 처음부터 Agentic은 과설계.
  - 노트: YAGNI. 측정(검색 실패율) 후 도입.
  - Commit: `git add slides/04-02-rag-agentic.md` → `git commit -m "feat(rag): 04-02 에이전틱편 6슬라이드 (Agentic RAG·ReAct·LangGraph)"`

---

## Task 3: 04-03 Graph RAG편 (6 슬라이드)

**Files:** Create `slides/04-03-rag-graph.md`

- [ ] **Step 1: S17 `rag-vector-limit` — 벡터 검색의 한계**
  - 메시지: 벡터는 "비슷한" 청크를 잘 찾지만 **관계·다단계**에 약함. 예 — "A 고장과 B 고장의 공통 원인은?"은 청크 유사도로 안 풀림.
  - 도식: ✗ 예시 box — 다홉 질문, 엔티티 간 관계, 전체 집계.
  - 노트: 벡터 검색은 "유사도"지 "추론"이 아님. 관계가 답에 필요하면 구조가 필요.

- [ ] **Step 2: S18 `rag-knowledge-graph` — 지식 그래프**
  - 메시지: 엔티티(노드) + 관계(엣지)로 지식을 구조화.
  - 도식: Mermaid graph — BMS 예시.
```
graph LR
  E3002[E-3002 냉매누출] -- 증상 --> LP[저압]
  E3002 -- 원인 --> LEAK[배관 누출]
  E3002 -- 원인 --> FREEZE[증발기 동결]
  P1001[P-1001 필터막힘] -- 증상 --> LF[풍량저하]
  FREEZE -- 점검 --> FILTER[필터 상태]
  P1001 -- 관련 --> FILTER
```
  - `[BMS]`: `fault_catalog.yaml`의 고장-증상-원인이 사실상 이 그래프 구조. (지금은 벡터로만 씀.)
  - 노트: 엔티티 추출·관계 정의가 비용. 도메인이 관계 중심일 때 가치.

- [ ] **Step 3: S19 `rag-graph-rag` — Graph RAG**
  - 메시지: 그래프 탐색 + 벡터 검색 결합. 관련 엔티티를 그래프로 따라가며 컨텍스트 수집 후 생성.
  - 도식: Mermaid — 질문 → (벡터로 진입 노드 찾기) → (그래프 이웃 확장) → 컨텍스트 → LLM.
  - `<small class="source">— Microsoft GraphRAG (2024)</small>`
  - 노트: "진입은 벡터, 확장은 그래프". 다홉·요약·집계 질문에 강함. 구축 비용이 진입 장벽.

- [ ] **Step 4: S20 `rag-map` — 전체 지도**
  - 도식: 3단계 box 비교 표 — Naive RAG / Agentic RAG / Graph RAG. 행: 무엇 / 강점 / 비용 / 언제.
  - `[BMS]`: 내 위치 = **Naive RAG에서 시작**(화살표로 표시). 가장 단순하고 가시화에 적합.
  - 노트: 사다리가 아니라 선택지. 문제에 맞게. 대부분 Naive로 충분.

- [ ] **Step 5: S21 `rag-roadmap` — BMS RAG 로드맵**
  - 도식: 타임라인/단계 box — ✅ 완료(스키마·인덱싱·검색·답변 가드·**가시화**) → ⬜ 다음(자동 감지·알림) → 더 나아가면(Agentic 재검색·Graph 관계추론).
  - `.callout`: "가시화로 RAG 내부를 이해했으니, 다음은 이 위에 무엇을 얹을지".
  - 노트: 내 실제 진행과 일치. 학습→구현→확장의 자연스러운 호.

- [ ] **Step 6: S22 `rag-refs` — 참고자료 + Commit**
  - 도식: 출처 리스트(`references.md`와 일치) — RAG 원논문·ReAct·GraphRAG·LangGraph + 내 BMS 작업(개념만).
  - 노트: Q&A 유도. "어디서 더 볼지".
  - Commit: `git add slides/04-03-rag-graph.md` → `git commit -m "feat(rag): 04-03 Graph RAG편 6슬라이드 (지식그래프·GraphRAG·전체지도·로드맵)"`

---

## Task 4: 문서 갱신 (outline · references · index 주석)

**Files:** Modify `docs/outline.md`, `docs/references.md`, (선택) `index.html`

- [ ] **Step 1: `docs/outline.md` 끝에 RAG 보너스 섹션 추가**
  - "## [보너스] RAG (에필로그 이후)" 헤더 + 3편(개념 10 / 에이전틱 6 / Graph 6) 슬라이드 목록 + 1줄 흐름 설명. 전체 슬라이드 합계 표에 보너스 22장 행 추가(또는 별도 표기).

- [ ] **Step 2: `docs/references.md`에 RAG 출처 추가** (작성 시 서지 정확 확인)
  - Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)
  - Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)
  - Microsoft Research, "GraphRAG" (2024)
  - LangChain / LangGraph 공식 문서
  - (BMS 작업은 발표자 자작 — 출처 "내부 작업"으로)

- [ ] **Step 3: (선택) `index.html`의 RAG_SLIDE 주석 번호를 실제(개념10·에이전틱6·Graph6)에 맞춤**
  - `SLIDE_FILES` 배열 자체는 수정 불필요(04-01/02/03 이미 등록). 주석 숫자만 정정.

- [ ] **Step 4: Commit**
  - `git add docs/outline.md docs/references.md index.html` → `git commit -m "docs(rag): outline·references에 RAG 보너스 섹션 반영"`

---

## Task 5: 렌더 검증 (수동)

**Files:** 없음. reveal.js 실제 렌더 확인.

- [ ] **Step 1: 정적 서버 기동**
  - Run: `cd D:\lg\work\SLS\seminar\vibe-coding-seminar; python -m http.server 8000`
  - Expected: 서버 기동.

- [ ] **Step 2: 브라우저로 RAG 섹션 확인**
  - `http://localhost:8000` 열고 BONUS 섹션(에필로그 이후)까지 이동.
  - 확인: (a) Load error 0(04-01/02/03 정상 로드) (b) Mermaid 도식 렌더됨 (c) 16:9에서 텍스트/표 안 깨짐 (d) BMS 유사도 표·5노드 도식 표시.
  - 깨지면 해당 `<section>` 수정 후 재확인.

- [ ] **Step 3: (선택) 발표자 노트 확인**
  - `S` 키로 노트 창 — 각 슬라이드 `<aside class="notes">` 표시 확인.

---

## 완료 기준
- `slides/04-01/02/03.md` 생성 → reveal.js에서 RAG 보너스 22슬라이드 정상 렌더(Load error 0), 16:9 안 깨짐.
- 개념 슬라이드마다 `[BMS]` 실제 값(유사도 표·1536·5노드·E-3002 답변)이 붙어 추상↔구체 연결.
- 3편 흐름(개념→에이전틱→Graph)이 "내 작업=Naive RAG, 다음=Agentic/Graph"로 이어짐.
- 도식이 텍스트보다 우선, 프로젝트 톤 일치, 다삼솔루션 미언급.
- `outline.md`·`references.md` 갱신, 커밋 분리(파일별).
