<section data-section="act3" id="superpowers-tdd">
  <h2>왜 TDD를 <em>강제</em>하는가 <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— Superpowers의 가장 강한 시그니처</span></h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    Vibe coding의 실패 모드 = <strong>그럴듯해 보이지만 작동 안 함</strong>. TDD는 그 갭을 <strong>객관 신호</strong>로 닫는다.
  </p>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box" style="border-left-color: var(--accent-danger);">
      <div class="box-title" style="color: var(--accent-danger);">1. Red — 실패 테스트 먼저</div>
      <p style="font-size: 0.88em; line-height: 1.5;">
        에이전트가 <strong>할 일을 테스트로 박는다</strong>. 작업 경계 = 테스트 = scope creep 차단.
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">2. Green — 통과까지 구현</div>
      <p style="font-size: 0.88em; line-height: 1.5;">
        "다 됐다"가 아니라 <strong>"녹색이다"</strong>. 통과한 테스트는 산문보다 위조하기 어려운 증거.
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-primary);">
      <div class="box-title" style="color: var(--accent-primary);">3. Refactor — 안전망 위에서</div>
      <p style="font-size: 0.88em; line-height: 1.5;">
        초록 유지하며 정리. 테스트가 회귀 방어막 → 리팩토링도 서브에이전트에 위임 가능.
      </p>
    </div>

  </div>

  <div class="box" style="margin-top: var(--space-md); border-left-color: var(--accent-secondary); max-width: 1500px; margin-left: auto; margin-right: auto;">
    <div class="box-title" style="color: var(--accent-secondary);">왜 에이전트에 특히 효과적인가</div>
    <ul style="font-size: 0.86em; line-height: 1.55; margin-top: 6px; columns: 2; column-gap: var(--space-xl); text-align: left; padding-left: 1.1em;">
      <li><strong>LLM은 자신감 있게 틀린다</strong> — 산문 "fixed"는 쉽지만, 통과한 테스트는 어렵다.</li>
      <li><strong>R-G-R은 서브에이전트 분할에 최적</strong> — 단계별 pass/fail 시그널이 명확.</li>
      <li><strong>테스트는 실행 가능한 명세</strong> — <span class="kw">writing-plans</span>가 자기검증된다.</li>
      <li><strong><span class="kw">verification-before-completion</span>과 직결</strong> — 통과 후에도 실제 로그 첨부 강제.</li>
    </ul>
  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    <strong>"Discipline beats taste."</strong> 사람은 마감에 쫓겨 테스트를 건너뛰고, AI는 미적 판단이 없다 — 강제 게이트만이 답.
  </p>

  <small class="source">github.com/obra/superpowers · SKILL: test-driven-development</small>

  <aside class="notes">
    이 슬라이드의 핵심 한 줄: "TDD는 시니어 디시플린 중 자동화 가능한 부분 — Superpowers는 그 부분을 강제한다."

    "vibe coding의 실패 모드" 강조 — 코드가 컴파일된다 ≠ 작동한다, 모델이 "fixed"라고 한다 ≠ 실제로 fix됐다. Replit 사건도 결국 "검증 없이 작동했다고 믿음"의 극단 사례.

    Red-Green-Refactor가 서브에이전트와 만나는 지점:
    - Red: 도메인 이해 에이전트 — 무엇을 검증할지 명세
    - Green: 코드 작성 에이전트 — 통과까지 구현
    - Refactor: 패턴 적용 에이전트 — 초록 유지
    각 단계가 다른 컨텍스트로 분리 가능 → 매 단계 fresh start, hallucination 누적 차단.

    `verification-before-completion` 한 번 더 강조:
    - "테스트 통과했다"는 주장 → 실제 로그/출력 첨부 요구
    - 에이전트가 잘못된 dir/branch에서 돌리거나 캐시 본 케이스 방어선
    - 시니어 리뷰의 자동화 버전

    왜 *강제*인가 (vs 권장):
    - GSTACK은 TDD 권장만 — 역할 리뷰(CEO/Eng/Design)로 대체
    - OMO는 멀티모델 라우팅에 집중, 테스트는 부수적
    - Superpowers만 "강제 게이트"로 박았다. 차별화 포인트.

    예상 질문: "프로토타입/탐색 단계에도 TDD?"
    → Superpowers도 인정. SKILL에 명시적 off 옵션, 또는 exploratory 모드.

    예상 질문: "UI/CSS는?"
    → Playwright 스크린샷 diff. Superpowers가 playwright skill로 통합.

    예상 질문: "다른 framework은 왜 강제 안 하나?"
    → 강제는 학습 곡선 있음. obra의 베팅: 시니어팀이면 강제가 장기 ROI 높음.

    메타 회수: 이 세미나 자체가 Superpowers로 만들어짐 — verification skill이 매 변경마다 작동.

    다음 슬라이드(GSTACK)와 자연 대비: "TDD 강제 대신 어떤 게이트?" 질문으로 연결.
  </aside>
</section>
