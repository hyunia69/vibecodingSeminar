<section data-section="act2" id="memory-files">
  <h2>메모리 파일 — 같은 의도, 다른 이름</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    LLM에게 프로젝트 컨텍스트를 알리는 마크다운. 도구마다 파일명이 다르다.
  </p>

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); margin-top: var(--space-lg); text-align: left;">

    <div class="box">
      <div class="box-title">CLAUDE.md</div>
      <p><strong>Anthropic Claude Code</strong></p>
      <p style="opacity: 0.75; font-size: 0.9em;">루트 + 모듈 단위 계층 로드. <span class="kw">/memory</span>로 편집. <span class="kw">@import</span> 지원.</p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">AGENTS.md</div>
      <p><strong>도구 중립 표준 (제안)</strong></p>
      <p style="opacity: 0.75; font-size: 0.9em;">Claude Code, Codex, OpenCode 등이 채택. 한 파일로 여러 에이전트 공통 규칙.</p>
    </div>

    <div class="box">
      <div class="box-title">.cursorrules / .cursor/rules/</div>
      <p><strong>Cursor</strong></p>
      <p style="opacity: 0.75; font-size: 0.9em;">단일 파일에서 디렉터리 기반 규칙 시스템(<span class="kw">.mdc</span>)으로 진화.</p>
    </div>

    <div class="box">
      <div class="box-title">GEMINI.md</div>
      <p><strong>Gemini CLI / Code Assist</strong></p>
      <p style="opacity: 0.75; font-size: 0.9em;">CLAUDE.md와 거의 동일 구조. Google 측 자체 명명.</p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    AGENTS.md가 도구 중립 표준 후보로 부상 중. 같은 내용을 한 곳에.
  </p>

  <small class="source">각 도구 공식 문서 / 2026.04 기준</small>

  <aside class="notes">
    핵심 메시지: 본질은 모두 같다 — "프로젝트 규칙을 LLM에 자동 로드".
    실무 팁: AGENTS.md를 진실 원천으로 두고, CLAUDE.md는 한 줄 import만. 도구 갈아타기 쉬움.
    Cursor는 .cursorrules에서 .cursor/rules/*.mdc 디렉터리 구조로 옮김 — 모듈별 규칙 관리.
    "어차피 같은 거니 이름 통일하자"가 AGENTS.md 운동의 동기.
  </aside>
</section>
