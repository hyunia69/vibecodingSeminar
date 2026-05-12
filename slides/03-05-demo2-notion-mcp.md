<section data-section="act3" id="demo2-notion-mcp">
  <h2 style="text-align: left;"><span style="opacity: var(--opacity-secondary); font-size: 0.7em;">DEMO ②</span><br>Notion MCP — 페이지 읽고 쓰기</h2>

  <p class="lead" style="margin-top: var(--space-md); text-align: left;">
    회의 노트를 읽고 → 요약하고 → 새 페이지에 정리. 4분.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-lg); text-align: left;">

    <div class="box">
      <div class="box-title">시연 순서</div>
      <ol style="font-size: 0.9em; line-height: 1.7;">
        <li><span class="kw">claude mcp list</span> — Notion 서버 연결 확인</li>
        <li>"이번 주 회의 페이지 읽어줘"</li>
        <li>모델이 <span class="kw">notion-search</span> + <span class="kw">notion-fetch</span> 호출</li>
        <li>요약 결과를 새 페이지로 <span class="kw">notion-create-pages</span></li>
        <li>브라우저에서 결과 페이지 열기</li>
      </ol>
    </div>

    <div>
      <pre><code class="language-bash" data-trim>
# .mcp.json — 한 번만 설정
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "NOTION_TOKEN": "secret_..." }
    }
  }
}
# 재시작 후
$ claude
> "이번 주 회의 페이지에서 결정 사항만
   모은 새 페이지를 만들어줘"
</code></pre>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    이 흐름은 Slack · Linear · GitHub MCP에 그대로 복제된다.
  </p>

  <aside class="notes">
    이건 짧고 임팩트 있게. 4분 이내.
    "이번 주 회의 페이지" 같은 추상 요청을 모델이 어떻게 구체 호출로 분해하는지 보여주는 게 핵심.
    실시간이라 가끔 느릴 수 있음 — "이건 실시간이라 가끔 이렇게 됩니다"로 받아넘기기.
    데모 끝나고 "Slack도 똑같다"로 일반화 강조.
  </aside>
</section>
