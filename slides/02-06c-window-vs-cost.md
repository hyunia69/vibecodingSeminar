<section data-section="act2" id="window-vs-cost">
  <h2>두 축 — 윈도우 점유 ≠ 청구 비용</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    같은 토큰을 두 번 측정한다. 어느 최적화가 어느 축에 작동하는지 다르다.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-md); max-width: 1300px; margin-left: auto; margin-right: auto;">

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">윈도우 점유 (Window)</div>
      <p style="font-size: 0.95em; margin: 6px 0;">
        매 요청 입력 + 출력 합 ≤ <span class="kw">1M</span>
      </p>
      <p style="opacity: 0.8; font-size: 0.85em; margin: 4px 0 0;">
        Per-request 한계. 캐시 여부와 무관. <br>
        <strong>같은 거 100번 보내도 윈도우는 그대로</strong>.
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-primary);">
      <div class="box-title" style="color: var(--accent-primary);">청구 비용 (Cost)</div>
      <p style="font-size: 0.95em; margin: 6px 0;">
        모든 요청의 토큰 누적 청구
      </p>
      <p style="opacity: 0.8; font-size: 0.85em; margin: 4px 0 0;">
        세션 누적. 캐시 히트 시 ~90% 할인. <br>
        <strong>100번 보내면 100배 청구 (캐시 없으면)</strong>.
      </p>
    </div>

  </div>

  <table style="margin-top: var(--space-md); width: 100%; border-collapse: collapse; font-size: 0.88em;">
    <thead>
      <tr style="border-bottom: 2px solid var(--border);">
        <th style="text-align: left; padding: 8px 12px;">최적화 기법</th>
        <th style="padding: 8px 12px;">비용 ↓</th>
        <th style="padding: 8px 12px;">윈도우 ↓</th>
        <th style="padding: 8px 12px;">성능 ↑</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px 12px; text-align: left;"><strong>Prompt Caching</strong></td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓ ~90%</td>
        <td style="padding: 8px 12px; color: var(--accent-danger);">✗</td>
        <td style="padding: 8px 12px; color: var(--accent-danger);">✗</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px 12px; text-align: left;"><strong>Deferred tools</strong> (ToolSearch)</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px 12px; text-align: left;"><strong>Skill metadata-only</strong></td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; text-align: left;"><strong>Auto-compaction</strong></td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
        <td style="padding: 8px 12px; color: var(--accent-primary);">✓</td>
      </tr>
    </tbody>
  </table>

  <p class="callout" style="margin-top: var(--space-sm);">
    캐시는 "공짜"가 아니다. <strong>비용만 공짜</strong>, 윈도우 자리는 그대로 차지한다.
  </p>

  <aside class="notes">
    시니어가 가장 자주 혼동하는 부분 — 두 축을 분리하지 않으면 모순된 조언이 동시에 나온다.
    "캐시되니까 CLAUDE.md 크게 써도 됨" vs "윈도우 한계 때문에 작게 써야 함" — 둘 다 맞다, 다른 축이라.

    실용 함의:
    1. 짧은 프롬프트가 답인 진짜 이유: 윈도우 + 성능 (lost-in-the-middle) — 비용 때문이 아니다.
    2. Anthropic이 deferred tools 도입한 이유: 87K 도구 스키마를 매 턴 1M에서 빼먹기 아까워서.
    3. Skill metadata-only도 같은 논리 — 본문은 invoke 때만 로드.

    비유 한 번 더: 봉투 크기(윈도우) vs 우표값(비용).
    100통 보내면 우표값 100번 내지만, 봉투 한도는 매번 리셋.
    캐시는 "할인 우표" — 봉투 안 키워줌.
  </aside>
</section>
