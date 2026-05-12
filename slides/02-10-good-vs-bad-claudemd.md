<section data-section="act2" id="good-vs-bad-claudemd">
  <h2>좋은 CLAUDE.md vs 나쁜 CLAUDE.md</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    같은 파일명, 정반대의 결과. 차이는 <strong>구체성</strong>과 <strong>최신성</strong>이다.
  </p>

  <div class="compare-grid" style="margin-top: var(--space-md);">

    <div style="border-color: var(--accent-danger);">
      <h3 style="color: var(--accent-danger);">나쁜 CLAUDE.md</h3>
      <ul style="text-align: left; font-size: 0.85em; line-height: 1.45;">
        <li>"좋은 코드를 작성하라" — 막연한 추상</li>
        <li>회사 위키를 통째로 붙임 (수십 KB)</li>
        <li>규칙끼리 자기모순 (TS strict ↔ any 허용)</li>
        <li>6개월째 갱신 안 됨 — 코드와 어긋남</li>
        <li>금지사항 없이 권장만 나열</li>
        <li>예시도 반례도 없음</li>
      </ul>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">좋은 CLAUDE.md</h3>
      <ul style="text-align: left; font-size: 0.85em; line-height: 1.45;">
        <li>도메인 명확 — "이 프로젝트는 X다"로 시작</li>
        <li>도구 사용 규칙 — <span class="kw">pnpm</span> O, <span class="kw">npm</span> X</li>
        <li>자주 하는 실수 + 반례 코드</li>
        <li><strong>절대 하지 말 것</strong> 섹션이 별도</li>
        <li>짧다 (1-3KB). 자주 갱신, Git diff 추적</li>
        <li>섹션마다 "왜"가 있음</li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    CLAUDE.md는 산문이 아니라 <strong>실행 규칙</strong>이다. 코드 리뷰처럼 다뤄라.
  </p>

  <aside class="notes">
    실제 PR 사례를 들 수 있으면 더 좋다 — "예전에 이런 CLAUDE.md 봤는데..."
    핵심: 갱신되지 않는 CLAUDE.md는 거짓말을 가르치는 것. 차라리 비워라.
    "절대 하지 말 것"이 가장 강력한 섹션 — LLM이 가장 잘 따르는 형식.
    이 슬라이드 자체 CLAUDE.md(프로젝트 루트)를 잠깐 열어 예로 쓸 수 있음.
  </aside>
</section>
