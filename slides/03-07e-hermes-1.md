<section data-section="act3" id="hermes-detail-1">
  <h2>Hermes Agent ① <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— 정체성과 일상 흐름</span></h2>

  <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: var(--space-sm); margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 14px 20px;">
      <div class="box-title">정체성 <span style="opacity:0.6; font-weight:400; text-transform:none; letter-spacing:0;">— 누적 단위: Skill + MEMORY.md</span></div>
      <ul style="font-size: 0.82em; line-height: 1.4;">
        <li>만든이: <strong>Nous Research</strong> · 2026.02 · <span class="kw">v0.12.0</span></li>
        <li>모토: <strong>"The agent that grows with you"</strong></li>
        <li>형태: CLI · Ink-TUI · 메시징 게이트웨이 · IDE 플러그인</li>
      </ul>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 14px 20px;">
      <div class="box-title" style="color: var(--accent-secondary);">자가 개선 — GEPA 학습 루프</div>
<pre style="font-size: 0.65em; margin: 4px 0;"><code class="language-text" data-trim>
[5+ tool call] → [Pattern Extraction]
              → [Skill Creation] ~/.hermes/skills/&lt;name&gt;.md
              → [Refinement] 15 call마다 GEPA 평가 → 패치
              → [MEMORY.md Nudge] "기억할까요?" → 동의 후 기록
</code></pre>
      <p style="font-size: 0.78em; opacity: 0.85; margin: 4px 0 0;">
        반복 ~40% 속도↑. Day 30의 Hermes는 Day 1과 다르다.
      </p>
    </div>

  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 14px 20px;">
      <div class="box-title">설치 + 자주 쓰는 CLI</div>
<pre style="font-size: 0.65em; margin: 4px 0;"><code class="language-bash" data-trim>
$ curl -fsSL .../install.sh | bash
$ hermes setup        # 모델·도구 마법사
$ hermes --tui        # TUI 시작
$ hermes model        # 300+ 모델 중 선택
$ hermes gateway      # Telegram/Slack/Discord…
$ hermes mcp          # MCP 설치/인증
$ hermes doctor       # 진단
</code></pre>
    </div>

    <div class="box" style="padding: 14px 20px;">
      <div class="box-title">세션 안 slash 명령</div>
      <ul style="font-size: 0.78em; line-height: 1.4;">
        <li><span class="kw">/new</span> · <span class="kw">/resume</span> — 분리·재개</li>
        <li><span class="kw">/model</span> — 즉시 전환 (계획 Opus, 코딩 Sonnet, 단순 Haiku)</li>
        <li><span class="kw">/compress</span> · <span class="kw">/usage</span> — 압축·토큰 확인</li>
        <li><span class="kw">/skills</span> · <span class="kw">/&lt;skill-name&gt;</span> — 탐색·호출</li>
        <li><span class="kw">/permission</span> · <span class="kw">/queue</span> · <span class="kw">/retry</span> · <span class="kw">/undo</span></li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    사용자는 skill을 "쓰지" 않는다 — 하루 끝에 새 skill이 그냥 생겨 있다.
  </p>

  <small class="source">github.com/NousResearch/hermes-agent · hermes-agent.nousresearch.com</small>

  <aside class="notes">
    이 슬라이드 메시지: "Hermes는 명령어가 많아 보이지만 일상은 단순. 학습은 백그라운드에서 일어난다."

    Self-improving은 마케팅 카피가 아니라 진짜 메커니즘 — GEPA(Generalized Evaluation and Policy Adjustment)가 실제로 돈다. 15 tool call마다 자체 평가, skill document 갱신.

    /model 전환 패턴 — 계획 Opus, 코딩 Sonnet/GPT-5, 단순 grep은 Haiku/Flash. /usage로 비용 보면서 옮겨다님.

    /compress가 핵심 — context 차오르면 자동 압축에 의존하지 말고 phase 전환 시 명시적 호출이 깔끔.

    MEMORY.md는 CLAUDE.md/AGENTS.md와 다른 점: 사람이 안 씀. 에이전트가 큐레이션. periodic nudge로 "이거 기억할까요?" 물음.

    예상 질문: "skill이 너무 많아지면?" → v0.12.0의 hermes curator가 중복 통합·폐기 자동.
    예상 질문: "MEMORY.md 민감 정보?" → /permission strict + .hermesignore 디렉터리 격리.

    다음 슬라이드(Hermes ②)에서 진짜 시그니처 — 다른 에이전트 위임 패턴.
  </aside>
</section>
