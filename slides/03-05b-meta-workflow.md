<section data-section="act3" id="meta-workflow">
  <h2>메타 예시 — <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">이 세미나가 자기 자신을 기록한다</span></h2>

  <p class="lead" style="margin-top: var(--space-sm); font-size: 1.1em;">
    Notion MCP를 <strong>읽기·쓰기 API로만</strong> 쓰지 않는다 — Claude Code <strong>Stop hook</strong>과 결합하면 \"세미나 자료 수정 → 자동으로 노션에 변경 이력 + 의사결정 누적\"이 된다.
  </p>

  <div class="box" style="border-left-color: var(--accent-secondary); padding: 14px 22px; margin-top: var(--space-sm);">
    <div class="box-title" style="color: var(--accent-secondary);">아키텍처 — 감지(자동) + push(명령 1개)</div>
    <svg viewBox="0 0 1400 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 1380px; display: block; margin: 6px auto 0;">
      <defs>
        <marker id="mw-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
          <path d="M 0,0 L 0,6 L 10,3 z" fill="currentColor"/>
        </marker>
      </defs>

      <g>
        <rect x="20" y="60" width="190" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="115" y="92" text-anchor="middle" font-size="17" fill="currentColor">슬라이드 수정</text>
        <text x="115" y="116" text-anchor="middle" font-size="14" opacity="0.7">slides/*.md, index.html</text>
      </g>

      <line x1="215" y1="100" x2="275" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#mw-arrow)"/>

      <g>
        <rect x="280" y="60" width="220" height="80" rx="10" fill="none" stroke="#5dd5c4" stroke-width="2.5"/>
        <text x="390" y="88" text-anchor="middle" font-size="17" font-weight="bold" fill="#5dd5c4">Stop hook</text>
        <text x="390" y="110" text-anchor="middle" font-size="13" opacity="0.85">턴 끝날 때마다 자동</text>
        <text x="390" y="128" text-anchor="middle" font-size="13" opacity="0.85">mtime 검사</text>
      </g>

      <line x1="505" y1="100" x2="565" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#mw-arrow)"/>

      <g>
        <rect x="570" y="60" width="220" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="680" y="88" text-anchor="middle" font-size="16" fill="currentColor">seminar-queue</text>
        <text x="680" y="108" text-anchor="middle" font-size="16" fill="currentColor">.jsonl</text>
        <text x="680" y="128" text-anchor="middle" font-size="12" opacity="0.7">로컬 큐 (append-only)</text>
      </g>

      <line x1="795" y1="100" x2="855" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#mw-arrow)"/>

      <g>
        <rect x="860" y="60" width="220" height="80" rx="10" fill="none" stroke="#5dd5c4" stroke-width="2.5"/>
        <text x="970" y="88" text-anchor="middle" font-size="17" font-weight="bold" fill="#5dd5c4">/seminar-flush</text>
        <text x="970" y="110" text-anchor="middle" font-size="13" opacity="0.85">슬래시 명령 1회</text>
        <text x="970" y="128" text-anchor="middle" font-size="13" opacity="0.85">Notion MCP 호출</text>
      </g>

      <line x1="1085" y1="100" x2="1145" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#mw-arrow)"/>

      <g>
        <rect x="1150" y="30" width="220" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="1260" y="55" text-anchor="middle" font-size="15" fill="currentColor">Notion · Changelog</text>
        <text x="1260" y="75" text-anchor="middle" font-size="12" opacity="0.7">무엇을 · 어떻게</text>

        <rect x="1150" y="100" width="220" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="1260" y="125" text-anchor="middle" font-size="15" fill="currentColor">Notion · Decisions</text>
        <text x="1260" y="145" text-anchor="middle" font-size="12" opacity="0.7">왜 · 트레이드오프</text>
      </g>
    </svg>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 12px 20px;">
      <div class="box-title">왜 두 단계로 나눴나</div>
      <ul style="font-size: 0.78em; line-height: 1.5; margin: 4px 0;">
        <li><strong>재귀</strong> — Stop hook이 매번 <span class="kw">claude -p</span> 띄우면 자식 세션도 Stop hook 발동 → 무한 루프</li>
        <li><strong>비용</strong> — 턴마다 LLM 호출은 토큰 폭발</li>
        <li><strong>WAF</strong> — Notion MCP가 한글+큰 payload를 받으면 Cloudflare가 차단</li>
        <li>→ 감지는 <strong>10ms Python</strong>, push는 <strong>한 번 명령</strong>으로 분리</li>
      </ul>
    </div>

    <div class="box" style="border-left-color: var(--accent-primary); padding: 12px 20px;">
      <div class="box-title">파일 구조 (.claude/)</div>
<pre style="font-size: 0.7em; margin: 4px 0;"><code class="language-text" data-trim>
settings.json           Stop hook 등록
hooks/seminar-log.py    mtime 감지 → 큐 append
commands/
  seminar-flush.md      슬래시 명령 정의
seminar-queue.jsonl     미push 변경 큐 (자동)
seminar-log-state.json  last_ts 상태 (자동)
</code></pre>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    이 슬라이드 데크 자체가 그 워크플로우 위에서 만들어지고 있다 — 라이브로 <span class="kw">/seminar-flush</span> 한 번 돌려 보일 수 있음.
  </p>

  <small class="source">Claude Code Hooks Docs · Notion MCP · 이 레포의 .claude/ 디렉터리</small>

  <aside class="notes">
    이 슬라이드의 메시지: "MCP를 단순 도구 호출로 보지 말고, Claude Code의 hook 시스템과 합쳐서 자동 워크플로우로 엮어라."

    메타 효과 — 청중에게 "지금 이 슬라이드 자체가 이 시스템 위에서 수정되고 있다"고 말할 수 있음. CLAUDE.md 프로젝트 정체성의 "이 슬라이드 자체가 Claude Code로 만들어진다 — 어떻게 만드는지가 곧 데모"와 맞물림.

    설계 결정 강조점 (왜 박스에 명시한 이유):
    - 재귀: 직관적으로 "Stop hook에서 claude -p 띄우면 되겠네" 생각하기 쉬운데, 그 자식 세션도 Stop hook이 또 돌아 무한 루프. 차단하려면 env var 가드가 필요한데 깨지기 쉬움.
    - 비용: 매 턴 claude -p는 토큰 비용 + 30-60초 지연. 진짜 자주 일하는 사람에겐 부담.
    - WAF: Notion MCP가 anthropic.com edge에 호스팅돼서 Cloudflare가 한글+큰 payload를 봇 같이 보고 차단(Ray ID 9fa4d...). 분할 push 필요.

    구현 디테일 (질문 받으면):
    - Stop hook은 ~/.claude/projects/<path>/.claude/settings.json에 등록. project-scope라 다른 프로젝트엔 안 묻음.
    - mtime 기반이라 transcript JSONL 파싱 안 함 — Claude Code 버전 변해도 안 깨짐.
    - 큐는 append-only JSONL. flush 실패해도 보존. 다음 flush가 누적분 다 처리.
    - /seminar-flush는 typo·공백만이면 사소한 정리로 묶고, 새 슬라이드 추가/순서 변경/톤 변경 같은 결정성 변경은 Decisions 후보로 분리해 사용자에 확인.

    예상 질문: "노션 토큰은 어디서?" → 이 케이스는 Claude.ai 통합 OAuth라 토큰 따로 안 필요. 일반 .mcp.json 방식이면 NOTION_TOKEN env var 필요.
    예상 질문: "왜 SessionEnd hook 안 썼나?" → 가능하지만 세션 비정상 종료에 fire 안 될 수 있음. Stop hook은 모든 턴 끝마다 확실히 fire.
    예상 질문: "다른 도구 (Slack, Linear)도 같은 패턴?" → 그대로 복제 가능. 변하는 건 페이지 ID와 prompt template 뿐.

    데모 흐름 제안:
    1. 슬라이드 하나 빠르게 수정 보여주기 (예: 03-01 한 줄 추가)
    2. .claude/seminar-queue.jsonl 까서 entry 쌓인 것 보여주기
    3. /seminar-flush 실행
    4. 노션 Changelog 페이지 새로고침 → 새 항목 보여주기
  </aside>
</section>
