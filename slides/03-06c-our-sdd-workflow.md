<section data-section="act3" id="our-sdd-workflow">
  <h2>우리 데모 워크플로우 — SDD 실전</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    이 세미나에서 만든 그 데모. 코드는 산출물, <strong>spec과 plan이 자산</strong>.
  </p>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box">
      <div class="box-title">① Brainstorming</div>
      <p style="font-size: 0.82em; opacity: 0.75; margin: 0 0 6px;"><span class="kw">superpowers:brainstorming</span></p>
      <ul style="font-size: 0.88em; line-height: 1.55;">
        <li>한 번에 한 질문 (총 7개)</li>
        <li>2–3 접근 제안 + 추천</li>
        <li>디자인 섹션별 승인 게이트</li>
        <li>자체 검토 → 모호성 4건 인라인 수정</li>
      </ul>
      <p style="font-size: 0.78em; opacity: 0.85; margin-top: var(--space-sm); margin-bottom: 0;">
        → <code>docs/superpowers/specs/<br>2026-05-07-...md</code> (10 섹션)
      </p>
    </div>

    <div class="box">
      <div class="box-title">② Writing Plan</div>
      <p style="font-size: 0.82em; opacity: 0.75; margin: 0 0 6px;"><span class="kw">superpowers:writing-plans</span></p>
      <ul style="font-size: 0.88em; line-height: 1.55;">
        <li>13 task로 분해</li>
        <li>각 task 2–5분, 4–6 step</li>
        <li>정확한 파일 경로 + 코드 블록</li>
        <li>자체 검토 → 4건 수정</li>
      </ul>
      <p style="font-size: 0.78em; opacity: 0.85; margin-top: var(--space-sm); margin-bottom: 0;">
        → <code>docs/superpowers/plans/<br>2026-05-07-...md</code>
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">③ Subagent 실행</div>
      <p style="font-size: 0.82em; opacity: 0.75; margin: 0 0 6px;"><span class="kw">superpowers:subagent-driven-development</span></p>
      <ul style="font-size: 0.88em; line-height: 1.55;">
        <li>5 work unit (W1–W5)</li>
        <li><strong>~23 서브에이전트 dispatch</strong></li>
        <li>각 W: implementer → spec review → quality review → fix loop</li>
        <li>이슈 7건 발견·수정</li>
      </ul>
      <p style="font-size: 0.78em; opacity: 0.85; margin-top: var(--space-sm); margin-bottom: 0;">
        → <code>demo/</code> assets (api, CLAUDE.md, scripts, README)
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    23 dispatch 중 implementer 6 · reviewer/fixer 17 → <strong>검토:생성 ≈ 3:1</strong>.
    SDD는 "코드 자동 생성"이 아니라 <strong>검토 시스템</strong>이다.
  </p>

  <small class="source">실제 통계 — 이 세미나 데모 제작 과정</small>

  <aside class="notes">
    이 슬라이드의 두 강력한 모먼트:
    1. <strong>메타 회수</strong>: "방금 본 데모는 이 흐름으로 만들어진 산출물." 청중에게 "지금 본 그것이 곧 SDD"라는 인지 모먼트.
    2. <strong>3:1 비율</strong>: SDD에 대한 흔한 오해 — "AI가 코드를 자동 생성한다" — 를 데이터로 반박. 실제로는 검토가 더 큰 비용.

    실제 dispatch 분해 (메모용):
    - Implementer: W1, W2, W3, W4, W5 + W2/W3/W4 fix subagents = 약 8개
    - Reviewer: W1-W5 각 spec compliance + code quality = 10개 + 재리뷰 = 12-13개
    - Final cross-cutting reviewer + fix = 2개
    합계 ~22-23
    검토 비중 = 약 75%

    모델 분배 (비용 절약):
    - Haiku: trivial 스캐폴딩 (W1, W3, W5)
    - Sonnet: 콘텐츠 작성 (W2, W4) + 모든 리뷰
    - Opus 4.7 (1M): 메인 컨트롤러 (이 세션)

    예상 질문: "23개 dispatch면 토큰 비용은?"
    → 모델 분배가 비용 게임. 작은 작업엔 Haiku, 판단 필요한 곳에 Sonnet.
    예상 질문: "그럼 사람이 더 빠르지 않나?" 
    → 1명이 spec 쓰고 23개 검토 시뮬레이션 받는 건 사람으로 불가능. 검토 다양성이 가치.
  </aside>
</section>
