<section data-section="act3" id="mcp-vs-skills">
  <h2>MCP vs Skills — 헷갈리지 말 것</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    둘 다 컨텍스트를 주입한다. 하지만 <strong>층위</strong>가 다르다.
  </p>

  <div class="compare-grid" style="margin-top: var(--space-lg);">

    <div style="border-color: var(--accent-primary);">
      <h3 style="color: var(--accent-primary);">MCP — 외부 시스템 통합</h3>
      <ul style="text-align: left; font-size: 0.9em;">
        <li><strong>런타임 연결</strong> — 프로세스로 실행되는 서버</li>
        <li>Notion · Slack · Postgres · GitHub · Filesystem</li>
        <li>도구(<span class="kw">tools</span>)와 자원(<span class="kw">resources</span>) 노출</li>
        <li>설정: <span class="kw">.mcp.json</span> / 호스트별 설정 파일</li>
        <li><strong>"무엇을 호출할 수 있는가"</strong></li>
      </ul>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">Skills — 모델 행동 형성</h3>
      <ul style="text-align: left; font-size: 0.9em;">
        <li><strong>디스크 기반</strong> — Markdown 파일 + 자동 활성</li>
        <li>SKILL.md에 트리거 조건과 절차를 기술</li>
        <li>모델이 스스로 적절한 시점에 로드</li>
        <li>설정: <span class="kw">~/.claude/skills/</span> · 프로젝트 <span class="kw">.claude/skills/</span></li>
        <li><strong>"어떻게 행동해야 하는가"</strong></li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    MCP는 <strong>능력 확장</strong>, Skills는 <strong>판단 형성</strong>. 자주 같이 쓴다.
  </p>

  <small class="source">Anthropic Skills 표준 / MCP 공식 문서</small>

  <aside class="notes">
    시니어 청중이라 가장 헷갈릴 부분.
    MCP = "팔다리를 늘린다", Skills = "두뇌의 결정 트리를 심는다".
    예) Notion MCP는 페이지를 읽는 능력, Notion-summary skill은 "요약을 어떤 포맷으로 쓸지"의 절차.
    Skills의 자동 활성이 핵심 — 매번 프롬프트로 끌어오지 않아도 모델이 알아서 로드.
    다음 슬라이드에서 Notion MCP 데모로 연결.
  </aside>
</section>
