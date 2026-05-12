<section data-section="act3" id="openclaw-detail-1">
  <h2>OpenClaw ① <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— 메신저에 사는 비서</span></h2>

  <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: var(--space-md); margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 16px 24px;">
      <div class="box-title">누가 · 무엇 · 어디까지 왔나</div>
      <ul style="font-size: 0.88em; line-height: 1.55;">
        <li>만든이: <strong>Peter Steinberger</strong> — 주말 프로젝트로 시작했다</li>
        <li>스토리: <strong>2026.01에 45K ⭐ → 2026.02에 ~200K ⭐</strong> (한 달 만에 4배)</li>
        <li>2026.02.14 — 창업자가 <strong>OpenAI에 합류</strong>, 이후 비영리 재단이 프로젝트를 인계받았다</li>
        <li>형태: Node.js · MIT · 내 노트북에 daemon으로 상주</li>
        <li>생태계: <strong>ClawdHub</strong> — 커뮤니티 워크플로우 1,700+개 (fork해서 시작)</li>
      </ul>
      <p style="font-size: 0.95em; margin-top: 12px; margin-bottom: 0;">
        한 줄: <strong>"Slack에 말 걸면, 내 노트북의 비서가 알아서 일한다."</strong>
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 14px 20px;">
      <div class="box-title" style="color: var(--accent-secondary);">아키텍처 — 단순한 3단</div>
      <svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 680px; display: block; margin: 6px auto 0;">
        <defs>
          <marker id="oc-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
            <path d="M 0,0 L 0,6 L 10,3 z" fill="currentColor"/>
          </marker>
        </defs>

        <g opacity="0.9">
          <rect x="20" y="20" width="160" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="100" y="47" text-anchor="middle" font-size="17" fill="currentColor">Slack · Telegram</text>
          <rect x="20" y="74" width="160" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="100" y="101" text-anchor="middle" font-size="17" fill="currentColor">WhatsApp · iMessage</text>
          <rect x="20" y="128" width="160" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="100" y="155" text-anchor="middle" font-size="17" fill="currentColor">Discord · 20+ 채널</text>
          <text x="100" y="200" text-anchor="middle" font-size="14" opacity="0.6">메신저 (입력)</text>
        </g>

        <line x1="195" y1="95" x2="265" y2="95" stroke="currentColor" stroke-width="2" marker-end="url(#oc-arrow)"/>

        <g>
          <rect x="280" y="40" width="200" height="120" rx="12" fill="none" stroke="#5dd5c4" stroke-width="3"/>
          <text x="380" y="80" text-anchor="middle" font-size="20" font-weight="bold" fill="#5dd5c4">OpenClaw daemon</text>
          <text x="380" y="110" text-anchor="middle" font-size="15" opacity="0.85">내 노트북에서 24/7</text>
          <text x="380" y="132" text-anchor="middle" font-size="15" opacity="0.85">"라우터 + 비서"</text>
          <text x="380" y="200" text-anchor="middle" font-size="14" opacity="0.6">중앙 (local-first)</text>
        </g>

        <line x1="495" y1="95" x2="565" y2="95" stroke="currentColor" stroke-width="2" marker-end="url(#oc-arrow)"/>

        <g opacity="0.9">
          <rect x="580" y="20" width="120" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="640" y="47" text-anchor="middle" font-size="17" fill="currentColor">Pi 에이전트</text>
          <rect x="580" y="74" width="120" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="640" y="101" text-anchor="middle" font-size="17" fill="currentColor">스크립트·cron</text>
          <rect x="580" y="128" width="120" height="42" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <text x="640" y="155" text-anchor="middle" font-size="17" fill="currentColor">웹·DB·API</text>
          <text x="640" y="200" text-anchor="middle" font-size="14" opacity="0.6">실행 도구</text>
        </g>
      </svg>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    Claude Code·Cursor가 <strong>IDE에 사는 도구</strong>라면, OpenClaw는 <strong>메신저에 사는 비서</strong>. 같은 LLM, 다른 자리에 둔 것뿐.
  </p>

  <small class="source">github.com/openclaw/openclaw · openclaw.ai · Medium "The OpenClaw Founder Just Joined OpenAI" (2026.02)</small>

  <aside class="notes">
    이 슬라이드 메시지: "OpenClaw가 무엇인지를 한 그림에 담는다 — 메신저(왼쪽)와 도구(오른쪽) 사이에 daemon이 있다."

    Peter Steinberger 컨텍스트: 시니어 개발자 청중이라면 그가 누군지 모를 수 있다. 굳이 PSPDFKit 같은 과거 작품 언급 안 해도 됨 — "주말 프로젝트가 200K stars"가 더 강한 신호. 본인이 OpenAI 합류한 건 2026.02.14. 이후 비영리 재단이 프로젝트를 인계받았다 — 이건 좋은 신호 (한 사람 의존성 해소).

    "메신저에 사는 비서" 비유가 핵심. 청중에게 "Claude Code는 IDE 옆에 사는데, OpenClaw는 어디 사는가?" 질문 던지고 답을 다이어그램으로 보여주는 흐름.

    아키텍처 다이어그램의 핵심: daemon이 항상 내 노트북에 살아있다 — 메시지가 들어오면 받아서, 도구를 실행하고, 다시 메시지로 답한다. 단순함이 강점.

    "local-first"의 의미 — 클라우드에 데이터 안 올린다. 메시지 주고받기는 메신저 인프라 거치지만, 실제 작업·데이터는 내 기기에. 프라이버시 민감 팀의 진입로.

    ClawdHub 1,700+ 워크플로우 — 이게 진짜 차별점. 빈 화면 시작이 아니라, 가까운 use case 하나 fork. 다음 슬라이드의 4가지 사례가 모두 ClawdHub에 있다.

    예상 질문: "Claude Code 같은 데서도 메신저 게이트웨이 만들 수 있지 않나?" → 가능하지만 OpenClaw는 daemon + 채널 통합 + ClawdHub까지 한 번에 묶여 있어 진입장벽이 낮음.

    예상 질문: "Pi 에이전트가 뭔가?" → OpenClaw가 기본 통합한 코딩 에이전트. Claude Code/Codex 등 다른 에이전트로도 교체 가능 (단, 일부 수동 설정).
  </aside>
</section>
