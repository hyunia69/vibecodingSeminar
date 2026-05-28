---
title: RAG 보너스 섹션 — RAG 가시화 세미나 자료
date: 2026-05-27
status: 승인됨 (구현 계획 대기)
section: BONUS (에필로그 이후, 04-XX)
---

# RAG 보너스 섹션 — RAG 가시화 세미나 자료

## 목적
바이브코딩 세미나에 **RAG 보너스 섹션**을 추가한다. RAG 기본 개념 → 기술 컴포넌트 → 순서를,
발표자가 **직접 만든 BMS HVAC RAG 가시화 작업**(Activepieces 5노드 학습 플로우)과 1:1로 엮어
추상 개념을 실제 값·화면으로 체득시킨다. 이어 Agentic RAG·Graph RAG까지 지형을 넓힌다.
`index.html`에 이미 `04-01/02/03` 슬롯이 등록돼 있으나 파일이 비어(현재 Load error) — 이를 채운다.

## 핵심 설계 결정
1. **범위 = 3편 전체** (사용자 지시: 분량·시간 제한 없음). 개념편 + 에이전틱편 + Graph RAG편 ~22슬라이드.
2. **사례 1:1 통합**: 개념 설명 직후 "내 BMS 플로우에선 이렇다"를 실제 값으로 즉시 붙인다(추상→구체).
   슬라이드 표의 `[BMS]` 열이 연관 지점.
3. **기존 형식 준수**: 슬라이드 = `<section>` HTML(마크다운 아님), 프로젝트 `CLAUDE.md` 디자인 규칙 따름.
4. **3파일 유지**: `04-01/02/03.md`에 각 편 `<section>`들을 담는다(index.html 등록은 이미 존재).

## 슬라이드 구성 (~22장)

### 04-01 개념편 (왜·순서·컴포넌트) — 10장
| # | 슬라이드 | 도식 | `[BMS]` 연관 |
|---|---|---|---|
| 1 | 왜 RAG인가 — LLM 한계(환각·최신성·출처·사내문서 모름) | box 비교 | "냉매 누출 대처법?"을 일반 LLM은 우리 장비 문서로 답 못함 |
| 2 | RAG 한 문장 + 비유(닫힌 책 vs 오픈북 시험) | 개념도 | — |
| 3 | 동작 흐름 전체 — 색인(offline) vs 질의(online) | Mermaid 2-track | 7문서→37청크 / 질문→답변 |
| 4 | 기술 컴포넌트 지도 — 임베딩·벡터DB·검색·LLM·오케스트레이션 | box 그리드 | OpenAI·Supabase·Activepieces 매핑 |
| 5 | 청킹 — 왜 자르나, 섹션 단위 | 도식 | `##` 섹션 청킹, P-1001 증상 섹션 추가로 recall 90→100% 일화 |
| 6 | 임베딩 — 텍스트→벡터, 의미 공간, 차원 | 의미공간 SVG | text-embedding-3-large @ 1536, 노드2 실제 1536 벡터 출력 |
| 7 | 벡터 검색 — 코사인 유사도·Top-K·threshold | 유사도 표 | "냉매가 새는"→5청크, **1위가 P-1001(키워드 아닌 의미!)** |
| 8 | 프롬프트 조립 + LLM 생성·인용 | 코드/도식 | 노드4 조립→노드5 E-3002 답변, chunk_id 인용 |
| 9 | 내가 만든 5노드 가시화 플로우 종합 | Mermaid/box 체인 | Activepieces 캔버스 = "RAG를 블랙박스로 두지 않기"(결정5) |
| 10 | RAG의 안전장치 — gate·가드·근거없음 | box | 환각0·제어지시0, 가시화(happy path)↔실제봇(가드) 대비 |

### 04-02 에이전틱편 — 6장
| # | 슬라이드 | `[BMS]` 연관 |
|---|---|---|
| 11 | 단순(Naive) RAG의 한계 — 1-shot 선형 | 내 플로우가 정확히 이것 |
| 12 | Agentic RAG — LLM이 검색 여부/재검색/쿼리 재작성을 결정 | — |
| 13 | ReAct 패턴 — 생각→행동→관찰 루프 (Mermaid) | — |
| 14 | LangGraph / LangChain — 코드 프레임워크 | Activepieces 노코드 vs 코드 대비 |
| 15 | 내 플로우를 에이전틱하게 확장하면? (재검색 분기 상상) | 5노드 + 판단 노드 |
| 16 | 정리 — 언제 Agentic가 필요한가 | — |

### 04-03 Graph RAG편 — 6장
| # | 슬라이드 | `[BMS]` 연관 |
|---|---|---|
| 17 | 벡터 검색의 한계 — 관계·다단계 추론 약함 | — |
| 18 | 지식 그래프 — 엔티티·관계 | 고장-증상-원인(`fault_catalog.yaml`)이 사실 그래프 구조 |
| 19 | Graph RAG — 그래프 + 벡터 결합 (Mermaid graph) | — |
| 20 | 전체 지도 — Naive → Agentic → Graph, 언제 무엇을 | 내 위치 = Naive에서 시작 |
| 21 | 마무리 — BMS RAG 로드맵(가시화 완료 → 다음) | 현재 완료 지점 + 다음 단계 |
| 22 | 참고자료·출처 | — |

## BMS 가시화 사례 — 슬라이드에 쓸 실제 데이터 (SoT)
> 발표자가 방금 완성한 작업. 슬라이드의 모든 `[BMS]` 수치는 아래에서만 가져온다.

- **도메인**: BMS 공조(HVAC) 고장 대응 RAG 모니터링 POC.
- **코퍼스**: 기술문서 7종(E-3002 냉매누출, P-1001 필터교체, M-2001 냉동기매뉴얼, E-1002 급기온도, P-2001 계절운전, P-3001 펌프, P-4001 냉각수) → `##` 섹션 단위 **37 청크**.
- **임베딩**: OpenAI `text-embedding-3-large` **@ 1536차원**(기본 3072 아님 — 차원 고정 계약).
- **벡터DB/검색**: Supabase Postgres + pgvector, `match_documents(query_embedding, match_count, filter)` RPC, HNSW 코사인. threshold strict **0.34** / widen **0.30**.
- **예시 질문**: `"냉매가 새는 것 같아요"`
- **검색 결과 Top-5 (실제 유사도)**:
  1. P-1001 / 증상 — **0.391** ← 1위 (키워드 "냉매" 아님, 의미 매칭)
  2. E-3002 / 가능한 원인 — **0.370**
  3. M-2001 / 정기 점검 항목 — **0.367**
  4. E-3002 / 즉각 조치 — **0.357**
  5. P-1001 / 비고 — **0.354**
- **LLM**: `gpt-4o`, temperature 0. 답변 = E-3002 원인 3개(배관/플레어 누출·냉매 충전량 부족·증발기 코일 동결) + 점검 3개, 각 주장에 `chunk_id` 인용. **검색 1위(P-1001)가 아니라 질문 맥락에 맞는 E-3002를 LLM이 선택**.
- **가시화 5노드**(Activepieces): `Webhook → HTTP 임베딩 → HTTP 검색(match_documents) → Code 조립 → HTTP LLM`. 수동 실행 + 캔버스 관찰.
- **학습 경계(가시화에서 의도적 제외, 실제 봇 `rag_answer.py`에만)**: threshold gate(strict→widen→none) · 사후 가드 5종(가짜인용0·인용100%·제어지시0·원인후보≤3·no_basis 일관성) · 위반 시 1회 재생성 · structured-output 스키마.
- **검증**: 노드3 검색 유사도 **0.3704 = `rag_answer.py` CLI 0.370 일치** → 캔버스 플로우가 실제 코드와 "같은 RAG"임 실증.
- **설계 철학**: 결정5 "RAG를 블랙박스로 만들지 않는다 — 임베딩→검색→LLM을 보이는 단계로".
- 원 저장소: `github.com/hyunia69/bms` (BMS POC, 별도 프로젝트). **세미나에는 개념·값만 인용, 시크릿/URL 비노출**.

## 형식 규칙 (프로젝트 `CLAUDE.md` 준수)
- 각 슬라이드 = `<section data-section="rag" id="...">` 한 개. `.md` 확장자지만 내용은 순수 HTML(마크다운 파싱 없음, `data-markdown` 금지).
- 스타일: 기존 CSS 클래스만 사용 — `.box`/`.box-title`/`.lead`/`.callout`/`.kw`/`.source`, CSS 변수 `var(--space-*)`/`var(--accent-*)`. 흰바탕검은글자 금지, 색으로 위계.
- 도식: Mermaid는 `<div class="mermaid">`, 의미공간·코사인은 인라인 SVG, 컴포넌트는 box 그리드, BMS 수치는 표.
- 코드블록: `<pre><code class="language-json|javascript" data-trim>`, 14~18줄 이하.
- 발표자 노트: 각 `<section>`에 `<aside class="notes">`.
- 톤: 시니어 동료에게 말하듯. 가르치는 톤·이모지 남발·"그러므로/따라서" 시작 금지. 한국어 본문 + 영어 기술 용어 혼용.
- 16:9, 큰 폰트, 텍스트 적게·도식 우선. **다삼솔루션 언급 금지**(CLAUDE.md 특별지시).

## 파일·등록·문서 갱신
- 작성: `slides/04-01-rag-concepts.md`(10 섹션), `slides/04-02-rag-agentic.md`(6), `slides/04-03-rag-graph.md`(6).
- `index.html`: 이미 3파일 등록됨 → 파일 생성만으로 Load error 해소. 슬라이드 수가 주석(RAG_SLIDE 01–20)과 달라지면 주석만 갱신.
- `docs/outline.md`: 끝에 RAG 보너스 섹션 흐름 추가.
- `docs/references.md`: RAG 관련 출처 추가(원논문 Lewis 2020 RAG, ReAct, Graph RAG 등). 작성 시 정확 서지 확인.

## 스코프 (명시적 제외)
- 새 인터랙티브 JS 시각화(`visualizations.js` 확장) ❌ — 정적 도식(Mermaid/SVG/box)으로 충분. 필요 판명 시 별도.
- BMS 저장소 시크릿·실 URL·ngrok 도메인 노출 ❌ — 개념과 값만.
- 라이브 데모 스크립트 ❌ — 슬라이드 자료에 집중(데모는 발표자가 Activepieces 화면으로 직접).

## 성공 기준
- `04-01/02/03.md` 작성으로 RAG 보너스 섹션이 reveal.js에서 정상 렌더(Load error 0), 16:9에서 안 깨짐.
- 개념 슬라이드마다 `[BMS]` 실제 값이 붙어 추상↔구체가 연결됨.
- 3편(개념→에이전틱→Graph) 흐름이 "내 작업은 Naive RAG, 다음은 Agentic/Graph"로 자연스럽게 이어짐.
- 도식이 텍스트보다 우선, 프로젝트 디자인 톤 일치.
