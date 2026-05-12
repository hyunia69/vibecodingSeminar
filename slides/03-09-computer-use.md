<section data-section="act3" id="computer-use">
  <h2>Computer Use — 닫힌 루프의 완성 <span style="font-size: 0.42em; opacity: 0.6; font-weight: 400; vertical-align: middle;">★ optional · 시간 부족 시 생략</span></h2>

  <p class="lead" style="margin-top: var(--space-md);">
    코드 작성 → 실행 → <strong>UI에서 직접 검증</strong> → 다음 사이클.
  </p>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-top: var(--space-lg);">

    <div class="box">
      <div class="box-title">gstack <span class="kw">/browse</span></div>
      <p style="font-size: 0.9em;">헤드리스 브라우저로 QA·시각 회귀·접근성 검사. 100ms급 명령. 스크린샷 증거로 PR 코멘트.</p>
    </div>

    <div class="box">
      <div class="box-title">superpowers-chrome MCP</div>
      <p style="font-size: 0.9em;">실제 Chrome에 attach. 로그인 세션 유지한 채 사용자 흐름 재현·DOM 조작.</p>
    </div>

    <div class="box">
      <div class="box-title">Claude in Chrome 확장</div>
      <p style="font-size: 0.9em;">브라우저 사이드패널 확장. 페이지 텍스트·콘솔·네트워크를 모델이 직접 관찰.</p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-lg);">
    "테스트 통과"가 아니라 <strong>"실제 화면에서 작동"</strong>이 새 완료 기준.
  </p>

  <small class="source">gstack / Superpowers Chrome / Anthropic Claude in Chrome, 2026</small>

  <aside class="notes">
    아주 짧게. 시간 부족하면 생략 가능.
    핵심 메시지는 "닫힌 루프" — 모델이 자기 코드의 결과를 시각적으로 확인할 수 있게 됐다.
    이게 왜 중요? UI 버그·시각 회귀·접근성 문제는 단위 테스트로 안 잡힌다.
    데모 짧게 보여줄 수 있으면 /browse로 vibe-coding-seminar 슬라이드 자체를 캡처하는 메타 시연.
  </aside>
</section>
