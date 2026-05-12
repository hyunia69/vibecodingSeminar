<section data-section="act3" id="mcp-config">
  <h2>MCP 설정은 어디에 — 도구마다 다르다</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    표준 프로토콜은 같지만 <strong>설정 파일 위치는 호스트별 컨벤션</strong>. 도구를 옮길 때 가장 자주 헷갈리는 지점.
  </p>

  <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box" style="padding: 14px 22px;">
      <div class="box-title">Claude Code — 3-스코프</div>
      <table style="width: 100%; font-size: 0.8em; margin-top: 6px;">
        <thead>
          <tr>
            <th style="padding: 4px 8px; text-align:left;">스코프</th>
            <th style="padding: 4px 8px; text-align:left;">파일</th>
            <th style="padding: 4px 8px; text-align:left;">언제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 8px;"><strong>Project</strong></td>
            <td style="padding: 4px 8px;"><span class="kw">.mcp.json</span></td>
            <td style="padding: 4px 8px;">팀 공유 · 커밋</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;"><strong>User</strong></td>
            <td style="padding: 4px 8px;"><span class="kw">~/.claude.json</span></td>
            <td style="padding: 4px 8px;">개인 전역</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;"><strong>Local</strong></td>
            <td style="padding: 4px 8px;"><span class="kw">.claude/settings.local.json</span></td>
            <td style="padding: 4px 8px;">커밋 안 함 · 개인 오버라이드</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 0.78em; opacity: 0.85; margin: 8px 0 0;">
        우선순위는 <strong>Local &gt; Project &gt; User</strong>. 관리는 <span class="kw">claude mcp add/list/remove</span>로.
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 14px 22px;">
      <div class="box-title" style="color: var(--accent-secondary);">스키마 (공통)</div>
<pre style="font-size: 0.72em; margin: 6px 0 0;"><code class="language-json" data-trim>
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "NOTION_TOKEN": "..." }
    }
  }
}
</code></pre>
    </div>

  </div>

  <p style="margin-top: var(--space-sm); font-size: 0.85em; opacity: 0.85; text-align: left; max-width: 1500px; margin-left: auto; margin-right: auto;">
    <strong>다른 호스트:</strong>
    Cursor <span class="kw">.cursor/mcp.json</span> ·
    Codex CLI <span class="kw">~/.codex/config.toml</span> (TOML) ·
    Claude Desktop <span class="kw">claude_desktop_config.json</span> (OS별 경로)
  </p>

  <p class="callout" style="margin-top: var(--space-sm);">
    프로토콜은 표준, <strong>설정 파일은 컨벤션</strong>. 토큰 들어가는 건 Local(커밋 안 함)에.
  </p>

  <small class="source">Claude Code Docs — MCP / Anthropic Model Context Protocol 2024.11</small>

  <aside class="notes">
    이 슬라이드의 메시지: "MCP 자체는 표준이지만 설정 파일 위치는 호스트별로 다르다 — 도구 옮길 때 가장 자주 막히는 부분."

    Claude Code의 3-스코프가 핵심. 시니어 청중이 즉시 공감하는 패턴: project(.mcp.json, 커밋) → user(전역, 개인) → local(개인 오버라이드, 커밋 안 함). 우선순위는 Local이 가장 강함 — local로 user/project를 끌 수 있다.

    실전 권고:
    - 팀 공유용 MCP 서버(예: 회사 wiki, 사내 DB)는 .mcp.json에 커밋.
    - 토큰·시크릿이 들어가는 건 절대 .mcp.json에 안 넣음 — Local 스코프나 env로 분리.
    - 개인이 좋아하는 도구(예: context7)는 User 스코프에.

    CLI 관리(`claude mcp add/list/remove`, `-s project|user|local` 스코프 플래그)가 안전한 디폴트. 파일 직접 편집은 syntax 깨질 위험 — 특히 Windows에서 경로 백슬래시 이스케이프.

    다른 호스트 컨벤션 차이가 강조 포인트:
    - Cursor는 .cursor/ 디렉토리 안에. project-local 강제.
    - Codex CLI는 TOML — JSON 아님. 한 번에 헷갈림.
    - Claude Desktop은 OS별 경로 (macOS: ~/Library/Application Support/Claude/, Windows: %APPDATA%\Claude\).

    예상 질문: "MCP 서버 자체를 어디서 받나?" → npm/PyPI에서 패키지로. 공식 레지스트리는 modelcontextprotocol.io. Anthropic이 운영하는 awesome-mcp 같은 리스트도.

    예상 질문: "팀에서 .mcp.json 커밋하면 다른 사람이 자동 활성화?" → 처음 열 때 "이 서버 신뢰합니까?" 프롬프트 한 번 거침. supply chain 방어선.

    예상 질문: "MCP 서버 디버깅?" → claude --mcp-debug 또는 claude mcp logs <name>. stderr가 호스트 로그로 흘러감.

    이 슬라이드 다음(03-04)에서 MCP vs Skills 비교로 자연 연결.
  </aside>
</section>
