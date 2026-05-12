<section data-section="act2" id="token-economics">
  <h2>토큰 경제학 — 왜 캐시가 핵심인가</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    1M 토큰을 매 턴 새로 보내면 <span class="kw">Opus 4.7</span>은 빠르게 비싸진다.
  </p>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-top: var(--space-lg);">

    <div class="box">
      <div class="box-title">입력 (Input)</div>
      <div class="stat-number" style="font-size: 1.6em;">$15</div>
      <div class="stat-label">per 1M tokens<br>CLAUDE.md, MCP, 히스토리 전체</div>
    </div>

    <div class="box" style="border-left-color: var(--accent-danger);">
      <div class="box-title" style="color: var(--accent-danger);">출력 (Output)</div>
      <div class="stat-number" style="font-size: 1.6em;">$75</div>
      <div class="stat-label">per 1M tokens<br>입력의 5배. 장황한 응답이 비용</div>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">캐시 절감 (Read)</div>
      <div class="stat-number" style="font-size: 1.6em;">~90%</div>
      <div class="stat-label">prompt cache 히트 시<br>같은 prefix 재사용</div>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-lg);">
    출력은 입력의 5배. 캐시가 비용 효율의 핵심.
  </p>

  <small class="source">Anthropic docs.claude.com / 발표 직전 재확인 기준 (2026.04)</small>

  <aside class="notes">
    발표 직전 docs.claude.com에서 가격 재확인 — 모델 가격은 자주 바뀐다.
    핵심 메시지: 출력 토큰이 5배 비싸다는 사실은 청중이 잘 모름.
    "장황한 응답을 시키지 말라"가 그래서 비용 가이드.
    캐시 90% 절감은 prompt caching 활성화 시 — 같은 CLAUDE.md를 매번 다시 읽지 않는다.
    숫자 천천히 읽기: "15달러", "75달러", "90% 절감".
  </aside>
</section>
