<section data-section="act3" id="harness-frameworks">
  <h2>하니스 프레임워크 3대장</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    "Thin Harness, Fat Skills"의 실제 구현체들.
  </p>

  <table style="margin-top: var(--space-lg); width: 100%; max-width: 1280px;">
    <thead>
      <tr>
        <th>이름</th>
        <th>만든이</th>
        <th>핵심 차별점</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Superpowers</strong></td>
        <td>Jesse Vincent (obra)</td>
        <td><strong>TDD 강제</strong> · 14+ 자동 활성 skills · SessionStart 훅 부트스트랩</td>
      </tr>
      <tr>
        <td><strong>GSTACK</strong></td>
        <td>Garry Tan (YC CEO)</td>
        <td><strong>Governance-as-Code</strong> · 가상 팀 시뮬레이션 · CEO/Eng/Design 리뷰</td>
      </tr>
      <tr>
        <td><strong>OMO</strong> <span style="opacity:0.6; font-size:0.85em;">(Oh My OpenAgent)</span></td>
        <td>code-yeongyu <span style="opacity:0.7;">(한국)</span></td>
        <td><strong>멀티 모델 라우팅</strong> · 11 전문 에이전트 (그리스 신화) · OpenCode 기반</td>
      </tr>
    </tbody>
  </table>

  <p style="margin-top: var(--space-md); opacity: var(--opacity-secondary); font-size: 0.9em; text-align: center;">
    워크플로우 단계는 다음 슬라이드에서 비교 — 그 뒤에 신예 두 가지(Hermes·OpenClaw)도 다룸
  </p>

  <p class="callout" style="margin-top: var(--space-lg);">
    "Superpowers는 <strong>TDD 강제</strong>, GSTACK은 <strong>Governance-as-Code</strong>, OMO는 <strong>멀티 모델 라우팅</strong>."
  </p>

  <small class="source">각 프레임워크 GitHub, 2026</small>

  <aside class="notes">
    셋 다 "Thin Harness Fat Skills"의 실증 사례. 각각 다른 차원으로 차별화.

    Superpowers — Jesse Vincent(obra) 개인. TDD 강제가 핵심. SessionStart 훅으로 매 세션 자동 부트스트랩.
    GSTACK — Garry Tan(YC CEO)이 직접 만들었고 stars 2만+. 본인이 60일 600K 라인 작성 주장. 23 슬래시 커맨드로 가상 엔지니어링 팀.
    OMO — code-yeongyu(한국). stars 39-48k, downloads 1.2-1.6M (2026 초). OpenCode 위에 올라간 오케스트레이션 레이어 — OpenCode의 BYOM 메시지는 자동으로 따라옴. 11 그리스 신화 에이전트(Sisyphus, Oracle, Hephaestus, Momus 등) + 작업별 모델 자동 라우팅이 시그니처.

    다음 3장(03-07a/b/c)에서 각각 상세. 그 다음 신예 두 가지 — Hermes·OpenClaw — 를 따로 묶어서 다룸 (메시징 게이트웨이라는 새 축이 떠오르는 중). 그 뒤 03-08에서 Superpowers + GSTACK 함께 사용.
  </aside>
</section>
