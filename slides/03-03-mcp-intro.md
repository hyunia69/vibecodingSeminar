<section data-section="act3" id="mcp-intro">
  <h2>MCP — Model Context Protocol</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    LLM이 외부 도구·데이터에 접근하는 <strong>표준 프로토콜</strong>.
  </p>

  <div class="box" style="margin-top: var(--space-md); max-width: 1100px; margin-left: auto; margin-right: auto;">
    <div class="box-title">정의</div>
    <p>Anthropic이 2024년 11월 발표한 오픈 표준. <strong>"AI의 USB-C"</strong> — 모든 도구를 같은 규격으로 꽂는다.</p>
  </div>

  <div style="display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: var(--space-sm); align-items: center; margin-top: var(--space-md); max-width: 1200px; margin-left: auto; margin-right: auto;">

    <div class="box" style="text-align: center;">
      <div class="box-title">Host</div>
      <p style="font-size: 0.9em;">Claude Code · Claude Desktop · Cursor</p>
    </div>

    <div style="font-size: 1.6em; opacity: var(--opacity-secondary);">↔</div>

    <div class="box" style="text-align: center; border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">MCP Client</div>
      <p style="font-size: 0.9em;">JSON-RPC stdio / SSE</p>
    </div>

    <div style="font-size: 1.6em; opacity: var(--opacity-secondary);">↔</div>

    <div class="box" style="text-align: center;">
      <div class="box-title">MCP Server</div>
      <p style="font-size: 0.9em;">Notion · Slack · Postgres · Filesystem · GitHub</p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    한 번 만든 서버는 <strong>모든 호스트</strong>에서 작동 — 도구가 모델에 lock-in되지 않는다.
  </p>

  <small class="source">Anthropic Model Context Protocol, 2024.11</small>

  <aside class="notes">
    MCP 정의는 한 슬라이드로 끝낸다.
    "USB-C 비유"가 직관적 — 표준 규격이라는 점만 잡으면 된다.
    Host가 Client를 띄우고 Client가 Server에 붙는 3단 구조.
    공식 SDK: TypeScript / Python (fastmcp) — 만드는 법은 별도 슬라이드 없이 노트로만.
    다음 슬라이드에서 Skills와 비교한다.
  </aside>
</section>
