<section data-section="act3" id="spec-driven-dev">
  <h2>Spec-Driven Development</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    코드는 산출물이다. <strong>명세가 입력이다.</strong>
  </p>

  <blockquote style="margin: var(--space-md) auto; max-width: 1300px;">
    어셈블리는 산출물이다 — 컴파일러가 만든다.<br>
    <strong>코드도 산출물이 된다 — AI가 만든다.</strong> 단, 결정론적이지 않으므로 <span class="kw">명세 + 검증</span>이 짝.
  </blockquote>

  <div class="compare-grid" style="margin-top: var(--space-md);">

    <div style="border-color: var(--accent-warning, #e8a33d);">
      <h3 style="color: var(--accent-warning, #e8a33d);">Vibe coding</h3>
      <ul style="text-align: left; font-size: 0.92em;">
        <li>입력 = 프롬프트 (휘발)</li>
        <li>저장 = 코드만</li>
        <li>재실행 = 처음부터 다시</li>
        <li>다중 에이전트 = 발산</li>
        <li>PR = 코드 diff</li>
      </ul>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">Spec-Driven</h3>
      <ul style="text-align: left; font-size: 0.92em;">
        <li>입력 = 명세 (git 영속)</li>
        <li>저장 = <strong>명세 + 코드</strong></li>
        <li>재실행 = 같은 spec → 일관성</li>
        <li>다중 에이전트 = 같은 spec 공유</li>
        <li>PR = <strong>의도 diff + 구현 diff</strong></li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    오해 비용 — spec 단계: <strong>1</strong> · code 단계: <strong>~10</strong>. 같은 오해라도 잡는 위치에 따라.
  </p>

  <small class="source">5 메시지 ③: "명세가 새 입력이다"</small>

  <aside class="notes">
    이 슬라이드의 한 줄: 컴파일러의 입력/산출물 관계가 한 단계 위로 올라간 것.

    시니어 개발자에게 익숙한 비유:
    - 우리는 어셈블리 직접 안 짠다 — C/Java로 쓰고 컴파일러가 한다.
    - 미래엔 코드도 직접 안 짠다 — 명세 쓰고 AI가 한다.
    - 단, AI는 컴파일러처럼 결정론적이지 않음 → 명세 + 검증(테스트, 리뷰)가 한 쌍.

    비용 곡선의 직관: spec 한 시간 vs 잘못 짠 코드 디버깅 10시간. 보통 10:1.

    "PR = 의도 diff + 구현 diff" 부분이 시니어가 좋아할 포인트. 코드 리뷰가 "이 라인 왜?"에서 "이 의도 왜?"로 올라감.

    예상 질문: "그럼 spec은 어떻게 검증해?" → 다음 슬라이드(03-06b)의 acceptance criteria + 도구로 답.
  </aside>
</section>
