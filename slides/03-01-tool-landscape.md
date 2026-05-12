<section data-section="act3" id="tool-landscape">
  <h2>도구 지형도 — 어디서 돌리나</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    같은 모델이라도 <strong>하니스</strong>가 결과를 가른다.
  </p>

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); margin-top: var(--space-lg);">

    <div class="box">
      <div class="box-title">CLI — 터미널 네이티브</div>
      <p style="font-size: 0.95em;"><strong>Claude Code</strong>, <span class="kw">codex</span>, <span class="kw">gemini-cli</span>, <span class="kw">aider</span></p>
      <p style="font-size: 0.85em; opacity: var(--opacity-secondary); margin-top: var(--space-xs);">자동화·서브에이전트·worktree에 강함. 하니스 프레임워크의 주 무대.</p>
    </div>

    <div class="box">
      <div class="box-title">IDE Extension — 편집기 통합</div>
      <p style="font-size: 0.95em;"><strong>Cursor</strong>, <strong>Windsurf</strong>, <strong>GitHub Copilot</strong>, <span class="kw">Continue</span></p>
      <p style="font-size: 0.85em; opacity: var(--opacity-secondary); margin-top: var(--space-xs);">인라인 편집·tab completion. 짧은 루프에 빠르지만 자동화는 약함.</p>
    </div>

    <div class="box">
      <div class="box-title">Desktop / Web — 대화형</div>
      <p style="font-size: 0.95em;"><strong>Claude.ai</strong>, <strong>ChatGPT</strong>, <strong>Gemini</strong>, <span class="kw">Claude Desktop + MCP</span></p>
      <p style="font-size: 0.85em; opacity: var(--opacity-secondary); margin-top: var(--space-xs);">설계·리뷰·문서. 파일시스템 직접 조작은 MCP 경유.</p>
    </div>

    <div class="box">
      <div class="box-title">Open / BYOM — 자체 호스팅</div>
      <p style="font-size: 0.95em;"><strong>OpenCode</strong>, <span class="kw">Aider</span>, <span class="kw">Continue</span>, <span class="kw">Ollama 백엔드</span></p>
      <p style="font-size: 0.85em; opacity: var(--opacity-secondary); margin-top: var(--space-xs);">75+ 모델 프로바이더. 로컬 모델·프라이빗 코드에 적합.</p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    오늘은 <strong>Claude Code (CLI)</strong>를 중심에 놓고 본다 — 자동화 깊이가 다르다.
  </p>

  <small class="source">각 도구 공식 사이트, 2026.04 기준</small>

  <aside class="notes">
    "여러분 뭘 써봤어요?" 한 번 물어보고 시작.
    핵심은 카테고리 차이. CLI는 자동화에 강하고 IDE 확장은 짧은 루프에 강하다.
    Cursor도 좋다 — 우리 워크숍이 CLI 자동화 중심일 뿐.
    OpenCode 한 번 언급하면 다음 슬라이드(로컬 모델)로 자연스럽게 연결된다.
  </aside>
</section>
