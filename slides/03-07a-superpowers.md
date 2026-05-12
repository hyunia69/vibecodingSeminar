<section data-section="act3" id="superpowers-detail">
  <h2>Superpowers <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— TDD를 강제하는 시니어의 워크플로우</span></h2>

  <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box">
      <div class="box-title">정체성</div>
      <ul style="font-size: 0.92em; line-height: 1.65;">
        <li>만든이: <strong>Jesse Vincent (obra)</strong></li>
        <li>철학: 시니어 개발자의 워크플로우 자동화. <strong>TDD 강제</strong>가 시그니처.</li>
        <li>진입: <span class="kw">SessionStart</span> 훅으로 매 세션 자동 부트스트랩.</li>
        <li>형태: skill 기반. 30+ 자동 활성 skill.</li>
      </ul>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">대표 Skills</div>
      <ul style="font-size: 0.88em; line-height: 1.55;">
        <li><span class="kw">brainstorming</span> — 아이디어 → 명세</li>
        <li><span class="kw">writing-plans</span> — 명세 → bite-sized 계획</li>
        <li><span class="kw">subagent-driven-development</span> — 서브에이전트 분산 실행</li>
        <li><span class="kw">test-driven-development</span> — TDD 게이트</li>
        <li><span class="kw">systematic-debugging</span> — 4단계 근본 원인</li>
        <li><span class="kw">verification-before-completion</span> — 증거 기반 완료</li>
        <li><span class="kw">requesting-code-review</span> · <span class="kw">receiving-code-review</span></li>
      </ul>
    </div>

  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box">
      <div class="box-title">강점</div>
      <ul style="font-size: 0.88em; line-height: 1.5;">
        <li>워크플로우 검토 게이트가 자동</li>
        <li>"증거 없이 완료 선언 금지" 규칙이 내장</li>
        <li>산출물 표준화 (<code>docs/superpowers/specs|plans/</code>)</li>
      </ul>
    </div>

    <div class="box">
      <div class="box-title">적합한 팀</div>
      <ul style="font-size: 0.88em; line-height: 1.5;">
        <li>TDD 익숙한 팀</li>
        <li>spec → plan → execute 흐름을 강제하고 싶은 팀</li>
        <li>Claude Code 단독 사용</li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    <strong>이번 세미나의 데모는 Superpowers로 만들어졌습니다.</strong>
    brainstorming → writing-plans → subagent-driven-development → 검증.
  </p>

  <small class="source">github.com/obra/superpowers</small>

  <aside class="notes">
    Superpowers의 핵심 한 줄: "혼자 잘하는 시니어 개발자의 디시플린을 자동화."

    SessionStart 훅이 흥미로운 메커니즘 — 매 세션 시작 시 룰셋이 자동 로드되어 "사용자가 매번 prompt에 적을 필요 없는" 항상 켜진 상태가 됨.

    skill 자동 활성: 사용자가 "디버깅 시작" 같은 발화를 하면 systematic-debugging skill이 자동 매칭. 명시적 호출 불필요.

    "증거 없이 완료 선언 금지" — verification-before-completion skill이 가장 사랑받는 skill. AI가 "다 됐어"하기 전에 실제 검증 증거(테스트 출력, curl 결과)를 요구.

    이 세미나 데모 개발 과정이 곧 Superpowers 사례 — 03-06c 슬라이드에서 이미 회수됨. 여기서 한 번 더 강조.

    예상 질문: "다른 도구에서도 쓸 수 있나?" → 기본은 Claude Code 통합. 다만 skill 패턴 자체는 다른 하니스로 포팅 가능.
  </aside>
</section>
