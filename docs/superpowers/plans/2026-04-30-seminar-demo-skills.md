# 세미나 데모 Skills 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal**: 바이브코딩 세미나 슬라이드 작업용 두 개의 프로젝트 로컬 Skill — `speaker-notes`(발표자 노트 자동 생성)와 `audience-anticipator`(시니어 청중 예상 질문 생성)을 작성하고, 세미나 라이브 데모로 즉시 사용할 수 있는 상태로 만든다.

**Architecture**: 두 Skill 모두 `<project>/.claude/skills/<name>/SKILL.md` 단일 파일로 구성. Description-매칭 자동 트리거. `speaker-notes`는 슬라이드 파일을 직접 편집(`<aside class="notes">` 갱신), `audience-anticipator`는 `docs/expected-questions/<slide-id>.md`를 새로 생성. 페르소나/톤은 SKILL.md 본문에 텍스트로 박제.

**Tech Stack**: Markdown only (SKILL.md). 외부 의존성 없음. 빌드 단계 없음. Claude Code의 Skill 메커니즘만 사용.

**스펙 참조**: `docs/superpowers/specs/2026-04-30-seminar-demo-skills-design.md`

**참고**: 이 프로젝트는 git 저장소가 아님 (사용자가 나중에 직접 git init 가능). 따라서 각 Task의 "Commit" 단계는 **선택적**으로 표시한다 — git이 초기화되어 있으면 커밋, 아니면 건너뛰기.

---

## File Structure

생성할 파일:

| 경로 | 책임 |
| --- | --- |
| `.claude/skills/speaker-notes/SKILL.md` | speaker-notes 스킬 정의 (frontmatter + 본문) |
| `.claude/skills/audience-anticipator/SKILL.md` | audience-anticipator 스킬 정의 |

수정할 파일: 없음 (검증 단계에서 슬라이드 한두 개를 임시로 수정하지만, 데모 직전 revert).

런타임에 생성될 파일: `docs/expected-questions/` 디렉터리 + 그 아래 슬라이드별 `.md` (audience-anticipator 첫 실행 시).

---

## Task 1: 스킬 디렉터리 골격 만들기

**Files:**
- Create: `.claude/skills/speaker-notes/` (디렉터리)
- Create: `.claude/skills/audience-anticipator/` (디렉터리)

- [ ] **Step 1: 디렉터리 생성**

작업 디렉터리는 `D:/lg/work/SLS/seminar/vibe-coding-seminar/`.

```bash
mkdir -p .claude/skills/speaker-notes
mkdir -p .claude/skills/audience-anticipator
```

- [ ] **Step 2: 디렉터리 확인**

```bash
ls .claude/skills/
```

Expected output:
```
audience-anticipator/
speaker-notes/
```

---

## Task 2: speaker-notes SKILL.md 작성

**Files:**
- Create: `.claude/skills/speaker-notes/SKILL.md`

- [ ] **Step 1: SKILL.md 파일 작성**

다음 내용을 그대로 작성한다.

````markdown
---
name: speaker-notes
description: Use when generating or refining 발표자 노트 (<aside class="notes">) for Reveal.js seminar slides. Triggered by phrases like "발표자 노트", "스피커 노트", "speaker notes", "노트 추가", "notes for this slide".
---

# 발표자 노트 생성

이 skill은 바이브코딩 세미나 슬라이드의 발표자 노트(`<aside class="notes">`)를 일관된 톤으로 작성한다. 슬라이드 파일을 직접 편집한다.

## 페르소나 (발표자)

- 한국어 + 영어 기술 키워드를 자연스럽게 혼용 (예: "context window가 폭발하면", "subagent를 spawn해서")
- 시니어 개발자 동료에게 말하듯이. **가르치는 톤 절대 금지**
- 농담은 적당히, 이모지 금지
- 한 슬라이드 = 발표 1–3분

## 노트 작성 원칙

1. **슬라이드 본문 반복 금지** — 슬라이드에 이미 쓰여있는 내용을 노트에 다시 적지 않는다
2. **슬라이드에 없는 것을 적는다** — 맥락, 뉘앙스, 발표 타이밍, 강조 단서, 즉흥 농담 거리, 실수 시 복구 멘트
3. **3–5줄, 짧게** — 발표 중 흘낏 보고 다시 청중을 보는 용도
4. **"~한다", "~다" 종결** — 시연/지시 같은 짧은 호흡
5. **시연 슬라이드면 실패 시나리오 한 줄** — "실수해도 당황 없이"

## 좋은 예 (실제 슬라이드 02-08)

본문: 5단계 시연 순서 (`/init` → `/context` → 작업 → `/context`).

```html
<aside class="notes">
  노트북을 프로젝터에 띄우고 즉시 시연 모드로.
  /init은 디렉터리를 스캔해서 CLAUDE.md 초안을 만든다 — 5-7초 걸림.
  /context 출력은 화면에 표 형태로 — 손가락으로 짚으면서 설명.
  작업 후 토큰 누적 보여주는 게 핵심. "이게 왜 컨텍스트 관리가 중요한지" 체감.
  실수해도 당황 없이. "이건 실시간이라 가끔 이렇게 됩니다."
</aside>
```

본문은 "무엇을 시연하는가", 노트는 "어떻게 시연하는가"를 적었다. 겹치지 않는다.

## 처리 절차

1. 슬라이드 파일 경로 확인. 대화 컨텍스트에서 추론할 수 있으면 추론, 아니면 사용자에게 묻기.
2. 슬라이드 파일을 Read 한다. 본문에서 다루는 핵심 1개를 식별.
3. 노트 3–5줄 작성. 위 5가지 원칙 적용.
4. 기존 `<aside class="notes">` 존재 여부 확인:
   - 있으면 → diff을 사용자에게 먼저 보여주고 교체 확인 받기
   - 없으면 → `</section>` 직전에 새로 추가
5. Edit tool로 파일 수정. 변경된 부분 사용자에게 보여주기.
````

- [ ] **Step 2: 파일 생성 확인**

```bash
ls -la .claude/skills/speaker-notes/SKILL.md
```

Expected: 파일 존재, 크기 1–3 KB 사이.

- [ ] **Step 3: frontmatter 유효성 확인**

```bash
head -5 .claude/skills/speaker-notes/SKILL.md
```

Expected output (정확히):
```
---
name: speaker-notes
description: Use when generating or refining 발표자 노트 (<aside class="notes">) for Reveal.js seminar slides. Triggered by phrases like "발표자 노트", "스피커 노트", "speaker notes", "노트 추가", "notes for this slide".
---

```

---

## Task 3: speaker-notes 검증 (수동, 라이브)

이 Task는 자동 테스트가 없는 LLM 기반 skill의 동작 검증. 새 Claude Code 세션에서 자연어로 트리거되는지 확인한다.

**Files:**
- Test against: `slides/02-11-why-multi-agent.md` (이미 노트가 있음 — 교체 시나리오 검증)
- Test against: 새로 노트 비어있는 슬라이드 하나 (없으면 한 개를 임시로 비워서)

- [ ] **Step 1: 검증용 깨끗한 슬라이드 준비**

기존 `slides/02-11-why-multi-agent.md`의 노트를 백업하고 비운다.

```bash
cp slides/02-11-why-multi-agent.md slides/02-11-why-multi-agent.md.bak
```

`slides/02-11-why-multi-agent.md` 파일에서 36–40번 줄의 `<aside class="notes">...</aside>` 블록을 **빈 블록**으로 임시 교체:

```html
<aside class="notes">
</aside>
```

- [ ] **Step 2: 새 Claude Code 세션에서 자연어 트리거 5종 시도**

각 트리거 시도 사이마다 노트 비운 상태로 reset (Step 1의 빈 블록으로). 다음 5개 phrase가 모두 `speaker-notes` skill을 자동 로드해야 한다:

1. `"slides/02-11-why-multi-agent.md에 발표자 노트 만들어줘"`
2. `"이 슬라이드 스피커 노트 추가해줘"` (대화 컨텍스트에 파일 있을 때)
3. `"add speaker notes to 02-11"`
4. `"02-11 슬라이드 노트 좀 채워줘"`
5. `"notes for this slide please"` (대화 컨텍스트에 파일 있을 때)

각 시도 후 확인:
- Skill이 로드되었는지 (Claude Code가 "Using speaker-notes skill" 비슷한 신호를 줌)
- `<aside class="notes">` 안에 3–5줄이 채워졌는지
- 페르소나(시니어 동료에게 말하듯, 가르치는 톤 없음)가 지켜졌는지

Expected: 5개 중 최소 4개 트리거. 4개 미만이면 description의 trigger phrase 보강 필요.

- [ ] **Step 3: 결과 노트 품질 점검 체크리스트**

생성된 노트를 다음 기준으로 점검:

- [ ] 슬라이드 본문(Fountain 50%, 물류 72시간, Anthropic 2-4×)을 그대로 복사하지 않음
- [ ] 발표 타이밍 / 강조 / 어디서 손가락으로 가리킬지 같은 단서 1개 이상 포함
- [ ] 3–5줄 범위
- [ ] "~합니다" 같은 존댓말 종결 대신 "~한다", "~보여줌" 등 짧은 호흡
- [ ] 이모지 없음

전부 OK가 아니면 SKILL.md 본문의 "노트 작성 원칙" 섹션을 보강하고 Step 2 재실행.

- [ ] **Step 4: 백업 복원**

```bash
mv slides/02-11-why-multi-agent.md.bak slides/02-11-why-multi-agent.md
```

검증용으로 임시로 만든 변경은 데모 전에 모두 되돌려야 한다 (그래야 라이브 데모에서 빈 노트 → 채워진 노트 비교가 자연스러움).

---

## Task 4: audience-anticipator SKILL.md 작성

**Files:**
- Create: `.claude/skills/audience-anticipator/SKILL.md`

- [ ] **Step 1: SKILL.md 파일 작성**

다음 내용을 그대로 작성한다.

````markdown
---
name: audience-anticipator
description: Use when predicting senior developer audience questions for a seminar slide. Triggered by phrases like "예상 질문", "청중 질문", "Q&A 준비", "시니어가 물을 만한", "anticipate questions".
---

# 청중 예상 질문 생성

이 skill은 바이브코딩 세미나의 시니어 청중이 던질 만한 날카로운 질문을 미리 뽑아 `docs/expected-questions/<slide-id>.md`로 저장한다.

## 청중 페르소나

- **시니어 개발자 2명**, 5년 이상 경력
- AI 코딩 도구를 일부 써봤음 — Copilot, ChatGPT, Cursor 정도
- **회의적이지만 호기심 있음** — 마케팅 멘트를 싫어함
- 통계/벤치마크 나오면 출처를 캐물음
- 자신의 코드베이스 / 팀 상황으로 환원해서 묻는 경향

## 질문 카테고리

각 카테고리에서 1–2개씩, 총 3–6개 질문 생성한다.

### 트집 (Skeptical)
- 통계/벤치마크 출처
- claim의 정확성 ("정말 X가 Y보다 빠른가?")
- 일반화 가능성 ("toy 프로젝트에서만 그런 것 아닌가?")

### 연결 (Cross-slide)
- 다른 슬라이드의 주장과 모순되거나 보강하는 지점
- 전체 흐름에서 이 슬라이드의 위치 — 앞/뒤로 무엇이 와야 자연스러운가
- 이전에 보여준 데모/시각화와의 호환

### 응용 (Practical)
- "우리 팀의 모노리포에서는?"
- "regulated industry에서는?"
- "팀에 도입할 때 가장 큰 저항은?"

## 좋은 예 (가상 슬라이드: 02-11 "왜 멀티 에이전트인가")

본문: Fountain 50% 빠른 스크리닝, 물류 72시간, Anthropic 2-4× 추정치.

```markdown
# 예상 질문 — 왜 멀티 에이전트인가

- 슬라이드: `slides/02-11-why-multi-agent.md`
- 생성일: 2026-04-30

## 트집

### Q. Fountain 50%, 물류 72시간 — 작업 복잡도 어느 수준에서 측정한 건가?
답변 힌트: docs/references.md의 Anthropic 2026 보고서 + Fountain 케이스 스터디. 단순 코드 생성에서는 오버헤드가 더 큼. "리포 전체 리팩터링" 같은 다단계 작업에서만 유의미하다.

### Q. "Anthropic 추정치"라고 적은 2-4×는 어떤 가정인가?
답변 힌트: 독립 작업 비율 / worktree 활용 가능성에 따라. 슬라이드 02-12에서 mechanism 설명할 때 상세히 짚는다.

## 연결

### Q. 02-06에서 "context window가 폭발한다"고 했는데, 멀티 에이전트는 그 한계를 어떻게 회피하나?
답변 힌트: 각 subagent가 독립 컨텍스트. orchestrator는 결과만 합침. → 02-13의 orchestrator pattern 슬라이드와 직접 연결.

## 응용

### Q. monorepo + Bazel 같은 환경에서 worktree가 동작하나?
답변 힌트: git worktree 자체는 동작. 단 빌드 시스템이 absolute path 가정하면 깨질 수 있음. 데모 ③에서 한 번 더 짚을 예정.
```

## 처리 절차

1. 슬라이드 파일 경로 확인. 없으면 사용자에게 묻기.
2. 슬라이드 파일 Read. 핵심 claim, 통계, 인용을 식별.
3. `docs/outline.md` Read. 전체 흐름 파악.
4. 인접 슬라이드 1–2개 Read. 파일명 prefix(예: `02-11`) 기준 직전/직후. 막 경계 넘는 경우(예: `02-15` → `03-01`) 건너뛰지 않는다.
5. 카테고리별로 질문 생성 — 위 좋은 예 형식 그대로.
6. `docs/expected-questions/` 디렉터리 확인, 없으면 생성.
7. `docs/expected-questions/<slide-id>.md`로 저장.
   - `<slide-id>` = 슬라이드 파일명의 basename (예: `slides/02-11-why-multi-agent.md` → `02-11-why-multi-agent.md`)
8. 같은 파일이 이미 있으면 사용자에게 덮어쓰기 확인을 받는다.
````

- [ ] **Step 2: 파일 생성 확인**

```bash
ls -la .claude/skills/audience-anticipator/SKILL.md
```

Expected: 파일 존재, 크기 2–4 KB 사이.

- [ ] **Step 3: frontmatter 유효성 확인**

```bash
head -5 .claude/skills/audience-anticipator/SKILL.md
```

Expected output (정확히):
```
---
name: audience-anticipator
description: Use when predicting senior developer audience questions for a seminar slide. Triggered by phrases like "예상 질문", "청중 질문", "Q&A 준비", "시니어가 물을 만한", "anticipate questions".
---

```

---

## Task 5: audience-anticipator 검증 (수동, 라이브)

**Files:**
- Test against: `slides/02-11-why-multi-agent.md` (통계/claim이 풍부 — 트집 카테고리 검증 좋음)
- Will create: `docs/expected-questions/02-11-why-multi-agent.md`

- [ ] **Step 1: 새 Claude Code 세션에서 자연어 트리거 5종 시도**

각 시도 전에 출력 파일이 있으면 삭제 (`rm -f docs/expected-questions/02-11-why-multi-agent.md`).

다음 5개 phrase가 모두 `audience-anticipator` skill을 자동 로드해야 한다:

1. `"02-11 슬라이드 예상 질문 뽑아줘"`
2. `"slides/02-11-why-multi-agent.md에 대해 시니어가 물을 만한 질문이 뭐가 있을까?"`
3. `"이 슬라이드 Q&A 준비 좀 해줘"` (대화 컨텍스트에 파일 있을 때)
4. `"anticipate audience questions for this slide"`
5. `"청중 질문 예측"`

각 시도 후 확인:
- Skill 자동 로드 신호
- `docs/expected-questions/02-11-why-multi-agent.md` 파일이 새로 생성됨
- 디렉터리가 없었던 경우 자동 생성됨

Expected: 5개 중 최소 4개 트리거. 4개 미만이면 description의 trigger phrase 보강.

- [ ] **Step 2: 결과 파일 품질 점검 체크리스트**

생성된 `docs/expected-questions/02-11-why-multi-agent.md`를 다음 기준으로 점검:

- [ ] 3개 카테고리(트집/연결/응용) 모두 등장
- [ ] 각 카테고리에 최소 1개 질문, 총 3–6개
- [ ] **트집** 항목이 통계 출처 / claim 검증을 실제로 건드림 (Fountain 50%, 물류 72시간, Anthropic 2-4× 중 최소 하나)
- [ ] **연결** 항목이 다른 슬라이드 ID(예: 02-06, 02-12, 02-13)를 구체적으로 인용
- [ ] **응용** 항목이 "우리 팀의 X에서는?" 형태의 환원
- [ ] 각 질문에 1–2줄 답변 힌트

전부 OK가 아니면 SKILL.md 본문의 "질문 카테고리" 섹션 또는 "좋은 예" 섹션을 보강하고 Step 1 재실행.

- [ ] **Step 3: outline.md / 인접 슬라이드 활용 확인**

생성된 질문 중 **연결** 카테고리 항목이 실제로 `slides/02-10-good-vs-bad-claudemd.md`(직전) 또는 `slides/02-12-worktree-mechanism.md`(직후) 또는 `docs/outline.md`의 흐름을 참고했는지 확인.

만약 인접 슬라이드를 무시하고 02-11만 보고 질문을 만들었다면 → SKILL.md의 처리 절차 4번 강조 필요.

---

## Task 6: End-to-end 데모 리허설

두 skill을 같은 슬라이드에 연속으로 호출해 데모 흐름을 확인한다.

**Files:**
- Test against: `slides/01-05-pitfalls-stats.md` (통계 슬라이드 — 두 skill 모두에 적합)

- [ ] **Step 1: 검증용 슬라이드 준비**

```bash
cp slides/01-05-pitfalls-stats.md slides/01-05-pitfalls-stats.md.bak
```

`slides/01-05-pitfalls-stats.md`의 `<aside class="notes">` 내용을 비운다 (`<aside class="notes">\n  </aside>` 형태로). 또한 `docs/expected-questions/01-05-pitfalls-stats.md`가 있다면 삭제.

- [ ] **Step 2: 새 Claude Code 세션에서 데모 시퀀스 실행**

다음을 순서대로 입력 (실제 데모 스크립트 그대로):

1. `"slides/01-05-pitfalls-stats.md 발표자 노트 작성해줘"`
   - Expected: `speaker-notes` skill 자동 로드, 슬라이드 파일의 `<aside class="notes">` 채워짐
2. `"이 슬라이드 예상 질문도 뽑아줘"` (이전 응답 컨텍스트에서 슬라이드 추론)
   - Expected: `audience-anticipator` skill 자동 로드, `docs/expected-questions/01-05-pitfalls-stats.md` 생성

- [ ] **Step 3: 데모 흐름 점검 체크리스트**

- [ ] 두 skill 호출 사이에 컨텍스트 충돌 없음 (이전 skill의 잔재가 다음 결과에 묻어나오지 않음)
- [ ] 두 결과물의 페르소나가 일관됨 (speaker notes의 톤과 audience questions의 톤이 같은 발표자/청중을 가정)
- [ ] 청중에게 보여줄 시각적 결과가 명확함:
  - 슬라이드 파일이 변경된 것이 git diff(혹은 파일 비교)로 깔끔하게 보임
  - 새 디렉터리(`docs/expected-questions/`)와 새 파일이 폴더 트리에 등장

- [ ] **Step 4: 데모 직전 정리**

라이브 데모에서 "처음부터" 보여주려면 검증 흔적을 모두 되돌린다:

```bash
mv slides/01-05-pitfalls-stats.md.bak slides/01-05-pitfalls-stats.md
rm -rf docs/expected-questions/
```

(실제 데모에서는 새 슬라이드를 골라 다시 빈 노트로 만들어 시작.)

---

## Self-Review

스펙 커버리지:

- [x] Skill 1 위치/frontmatter/동작/본문 구성 → Task 2
- [x] Skill 2 위치/frontmatter/동작/본문 구성 → Task 4
- [x] 출력 파일 형식 (audience-anticipator의 expected-questions 마크다운) → Task 4의 SKILL.md 좋은 예에 명시
- [x] 디렉터리 구조 → Task 1, 검증 시 자동 생성 확인 Task 5
- [x] 데모 흐름 → Task 6
- [x] 엣지 케이스: 슬라이드 파일 못 찾을 때, 기존 노트 있을 때, outline.md 부재, 디렉터리 부재, 같은 expected-questions 파일 존재 → 모두 SKILL.md 본문의 "처리 절차"에 반영
- [x] 검증 (수동) → Task 3, 5, 6

플레이스홀더 스캔: 없음. 모든 SKILL.md 본문이 완성된 형태로 본 계획에 박혀 있음.

타입 일관성: skill 이름(`speaker-notes`, `audience-anticipator`), description 트리거 phrase, 슬라이드 파일 경로 형태(`slides/<id>.md`), 출력 파일 경로(`docs/expected-questions/<id>.md`) 모두 일관.
