# 바이브코딩 세미나 슬라이드 프로젝트

## 프로젝트 정체성

이 프로젝트는 **바이브코딩(에이전틱 엔지니어링)에 대한 세미나 슬라이드 자료**다.
청중은 시니어 개발자 2명. 형식은 발표자가 데모를 보여주는 소규모 정보 전달 자리(1.5-2시간).

**메타 메시지**: 이 슬라이드 자체가 Claude Code로 만들어진다. "어떻게 만드는지"가 곧 데모.

## 기술 스택

- **프레임워크**: Reveal.js 5.x (CDN 사용, 빌드 단계 없음)
- **스타일**: 커스텀 CSS (3가지 테마: dark / light / midnight)
- **코드 강조**: highlight.js (Reveal.js에 내장)
- **다이어그램**: Mermaid.js (필요한 곳에만)
- **폰트**: Pretendard (한글), JetBrains Mono (코드)
- **화면 비율**: 16:9
- **언어**: 한국어 본문 + 영어 기술 키워드 혼용

## 디자인 원칙

### 톤
- 시니어 개발자 동료에게 말하듯이. 가르치는 톤 금지.
- 영어 기술 용어를 자연스럽게 혼용 (예: "context window가 폭발하면" / "subagent를 spawn해서")
- 농담은 적당히. 과한 이모지 금지.

### 시각
- 텍스트 적게, 의미 많게. 한 슬라이드에 핵심 1개.
- 큰 폰트 (제목 64-80px, 본문 32-40px). 뒷자리에서도 보여야 함.
- 다이어그램과 표가 텍스트보다 우선.
- 코드 블록은 14-18줄 이하. 더 길면 분할.
- 흰 배경에 검은 글자 같은 평범한 배색 금지. 색상으로 정보 위계 표현.

### 슬라이드 길이 가이드
- 한 슬라이드 = 발표 1-3분
- 세션 1개 = 8-12 슬라이드
- 전체 = 50장 ± 5장

## 디렉터리 구조

```
vibe-coding-seminar/
├── CLAUDE.md              # 이 파일 (프로젝트 헌법)
├── AGENTS.md              # 다른 에이전트(Codex/Gemini/Cursor) 공통 규칙
├── README.md              # 빌드/실행 가이드
├── index.html             # 진입점 — SLIDE_FILES 배열로 슬라이드 등록
├── slides/                # 슬라이드 파일 (확장자 .md지만 내용은 <section> HTML)
│   ├── 00-title.md
│   ├── 01-XX-*.md         # 1막
│   ├── 02-XX-*.md         # 2막
│   ├── 03-XX-*.md         # 3막
│   └── 99-XX-*.md         # 에필로그
├── assets/
│   ├── css/{base,theme-dark,theme-light,theme-midnight}.css
│   ├── js/{theme-switcher,visualizations}.js
│   └── images/
├── demo/                  # 라이브 데모용 서브프로젝트 (별도 CLAUDE.md)
│   └── api/               # Express + node:test 오케스트레이터 데모 대상
├── docs/                  # outline.md, speaker-notes.md, references.md
└── .claude/               # 훅·슬래시 커맨드·프로젝트 skills
```

> **확장자 함정**: `slides/*.md`는 마크다운 파서를 거치지 않는다. 파일 내용은 그대로 `<section>...</section>` HTML 블록이며 `fetch()`로 읽혀 `innerHTML`에 삽입된다. 새 파일도 동일한 패턴을 따를 것 (`data-markdown` 사용 금지).

## 슬라이드 작성 규칙

### Reveal.js 섹션 구조
각 슬라이드는 `<section>` 한 개. 외부에서 `data-markdown` 또는 직접 HTML.

```html
<section>
  <h2>슬라이드 제목</h2>
  <div class="content">
    <!-- 본문 -->
  </div>
  <aside class="notes">
    발표자 노트: 이 슬라이드에서 강조할 포인트
  </aside>
</section>
```

### 슬라이드 번호와 ID 규칙
파일명: `<막번호>-<순서>-<주제>.html`
예: `02-06-subagents-worktree.html`

각 `<section>`에 `id`와 `data-section` 속성:
```html
<section id="subagents" data-section="act2">
```

### 이미지/다이어그램
- 가능하면 SVG 인라인 (확대해도 깨지지 않음)
- Mermaid는 `<div class="mermaid">` 사용
- 외부 이미지는 `assets/images/`

### 코드 블록
```html
<pre><code class="language-typescript" data-trim data-line-numbers>
const harness = createHarness({
  context: loadCLAUDEmd(),
  tools: [bash, read, edit, mcp],
  guards: [PreToolUse, PostToolUse]
});
</code></pre>
```

## 콘텐츠 가이드

### 핵심 메시지 (전체를 관통하는 5가지)

1. **"바이브"는 마케팅, 진짜는 엔지니어링이다**
2. **컨텍스트가 왕이다** (CLAUDE.md, AGENTS.md, MCP, Skills)
3. **명세가 새 입력이다** (Spec-Driven Development)
4. **병렬이 새 표준이다** (Subagent + worktree)
5. **시니어가 더 잘 쓴다** — 검토할 줄 알기 때문

### 인용 사용 규칙
모든 통계와 인용은 `docs/references.md`에서 출처 확인 가능해야 함.
출처 표기는 슬라이드 하단 작은 글씨로:
```html
<small class="source">— Anthropic Agentic Coding Trends Report 2026</small>
```

## 빌드와 미리보기

빌드 단계 없음. `index.html`을 정적 서버로 띄우면 됨.

```bash
# Python (가장 간단)
python -m http.server 8000

# 또는 Node
npx serve .
```

## 슬라이드 등록 파이프라인

`slides/` 파일을 새로 만들어도 **`index.html`의 `SLIDE_FILES` 배열에 추가하지 않으면 화면에 나타나지 않는다.** 슬라이드 순서도 이 배열로만 결정된다 (파일명 정렬이 아니라).

- 외부 파일로 등록: 배열에 `'slides/02-99-new.md'` 문자열 추가
- 인라인 섹션 등록 (act-divider 같은 간단한 것): `{ inline: \`<section>...</section>\` }` 객체 추가
- 슬라이드를 잠시 빼고 싶을 때: 배열 항목을 주석 처리 (파일 자체는 보존)

`SLIDE_FILES` 위치: `index.html` 안의 `<script>` 블록 상단.

## 데모 서브프로젝트 (`demo/api/`)

세미나 3막의 라이브 데모(오케스트레이터 패턴 시연) 대상이다. 슬라이드와 독립된 미니 프로젝트로, **별도 `demo/CLAUDE.md`가 데모 진행 규칙을 정의**한다. 메인 슬라이드 작업과는 분리해서 다룰 것.

- 런타임: Node ≥18 (ESM, `"type": "module"`)
- 의존성: `express@^4.19.2`만 사용 (데모 단순성 유지)
- 실행: `cd demo/api && npm start`
- 전체 테스트: `cd demo/api && npm test` (== `node --test tests/*.test.js`)
- 단일 테스트: `cd demo/api && node --test tests/<name>.test.js`
- 라이브 데모 실행 방식 및 worktree 머지 규칙은 `demo/CLAUDE.md` 참조.

## `.claude/` 인프라

### Stop 훅 — 자동 노션 로깅

`.claude/hooks/seminar-log.py`가 Stop 이벤트마다 실행되어 `slides/*.md`, `index.html`, `CLAUDE.md`의 mtime 변경을 감지하고 `.claude/seminar-queue.jsonl`에 누적한다. **노션에 직접 푸시하지 않는다** (LLM 재귀와 Cloudflare WAF 회피를 위한 의도된 분리).

큐는 `/seminar-flush` 슬래시 커맨드로 노션 페이지에 푸시한다 (Changelog vs Decisions로 분기). 큐 파일이 커지거나 노션 동기화가 어긋난다고 느끼면 이 파이프라인부터 의심할 것.

### 슬래시 커맨드 / 프로젝트 skills

- `/seminar-flush` — 위 큐를 노션으로 푸시. 페이지 ID는 커맨드 정의 안에 박혀있음.
- `/tdd` — Superpowers TDD 한 줄 실행기.
- 프로젝트 skills (`.claude/skills/`): `speaker-notes`(발표자 노트 생성/리파인), `audience-anticipator`(예상 질문 예측), `fixing-typos`(한국어+영어 혼용 오타 교정). 트리거 문구는 각 `SKILL.md` 참조.

## 에이전트 간 우선순위

충돌 시 순서 (AGENTS.md 명세):
1. **CLAUDE.md** (이 파일, 프로젝트 헌법)
2. **AGENTS.md** (Claude 외 에이전트 공통 규칙)
3. **docs/outline.md** (콘텐츠 흐름의 단일 진실 원천)
4. 사용자 직접 지시

## 특별 지시사항

### Hyun님이 강조한 사항
- 서브에이전트/멀티에이전트/병렬처리 부분에 **각별한 신경**
- 하니스 엔지니어링 정의를 **명확하고 단단하게**
- **다삼솔루션 관련 내용은 절대 참조하지 말 것**
- 데모 ③(Supabase + Vercel)에 디자인 신경쓰기

### 자주 하는 실수
- 슬라이드에 텍스트 너무 많이 넣음 → 줄여라
- 이모지 남발 → 절제
- "그러므로" "따라서" 같은 단어로 슬라이드 시작 → 안 됨, 자체로 완결
- 영어 원문 그대로 베끼기 → 한국어로 자연스럽게 (단, 기술 용어는 영어 OK)

## 참고 자료
- 인용/출처: `docs/references.md`
- 전체 흐름: `docs/outline.md`
- 발표 노트: `docs/speaker-notes.md`
