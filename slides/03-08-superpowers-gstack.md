<section data-section="act3" id="superpowers-gstack">
  <h2>Superpowers + GSTACK — 실제 워크플로우</h2>

  <div class="compare-grid" style="margin-top: var(--space-md);">

    <div style="border-color: var(--accent-primary);">
      <h3 style="color: var(--accent-primary);">Superpowers (obra)</h3>
      <p style="font-size: 0.9em; opacity: var(--opacity-secondary);">SessionStart 훅으로 자동 부트스트랩</p>
      <ol style="text-align: left; font-size: 0.9em; line-height: 1.7;">
        <li><span class="kw">/superpowers:brainstorm</span> — 의도 탐색</li>
        <li><span class="kw">/write-plan</span> — 명세 작성</li>
        <li><span class="kw">/execute-plan</span> — TDD로 구현</li>
        <li><span class="kw">/verification-before-completion</span> — 증거 기반 완료 선언</li>
      </ol>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">GSTACK (Garry Tan)</h3>
      <p style="font-size: 0.9em; opacity: var(--opacity-secondary);">23개 슬래시 커맨드 = 가상 엔지니어링 팀</p>
      <ol style="text-align: left; font-size: 0.9em; line-height: 1.7;">
        <li><span class="kw">/office-hours</span> — 디맨드·스코프 검증</li>
        <li><span class="kw">/plan-ceo-review</span> · <span class="kw">/plan-eng-review</span></li>
        <li><span class="kw">/qa</span> — 자동 테스트·수정·재검증 루프</li>
        <li><span class="kw">/ship</span> · <span class="kw">/land-and-deploy</span></li>
      </ol>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-lg);">
    두 프레임워크를 <strong>Stacking</strong> 하여 사용: Superpowers로 구현하고, GSTACK으로 <strong>On-the-loop Governance</strong> 수행.
  </p>

  <small class="source">Superpowers GitHub / GSTACK GitHub, 2026.04</small>

  <aside class="notes">
    Superpowers는 "혼자 잘하는 시니어"의 워크플로우 — TDD 강제가 핵심.
    GSTACK은 "팀의 검토 절차"를 시뮬레이션 — CEO/Eng/Design/DX 리뷰가 직렬로 돈다.
    universal이라는 점이 중요 — 어느 모델이든 같은 명령어로 작동.
    실전 팁: 우선 GSTACK의 /office-hours만 써봐도 가치 즉시 체감.
    이 슬라이드 후 자연스럽게 Computer Use(닫힌 루프)로 넘어간다.
  </aside>
</section>
