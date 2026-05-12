<section data-section="act2" id="context-window-anatomy">
  <h2>컨텍스트 윈도우 — 무엇이 차 있는가</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    1M 토큰은 "빈 종이"가 아니다. 시작하기 전에 이미 절반은 차 있다.
  </p>

  <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-sm); margin-top: var(--space-lg); text-align: left;">

    <div class="box">
      <div class="box-title">① System Prompt</div>
      <p style="font-size: 0.85em;">하니스가 주입하는 기본 행동 규칙. 사용자는 못 본다.</p>
    </div>

    <div class="box">
      <div class="box-title">② CLAUDE.md / AGENTS.md</div>
      <p style="font-size: 0.85em;">프로젝트별 규칙. 매 턴 자동 로드.</p>
    </div>

    <div class="box">
      <div class="box-title">③ MCP 도구</div>
      <p style="font-size: 0.85em;">서버 디스크립션 + 스키마. 도구 많을수록 비대.</p>
    </div>

    <div class="box">
      <div class="box-title">④ Skills</div>
      <p style="font-size: 0.85em;">SKILL.md의 metadata만 상시 로드. 본문은 호출 시.</p>
    </div>

    <div class="box">
      <div class="box-title">⑤ 대화 히스토리</div>
      <p style="font-size: 0.85em;">사용자 입력 + 모델 응답 + 도구 결과. 가장 빨리 부푼다.</p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-lg);">
    다음 슬라이드에서 같은 막대를 실시간 시각화로 본다.
  </p>

  <aside class="notes">
    5개 카테고리를 손으로 짚으면서 천천히. 청중은 ⑤만 의식하지만 ①~④가 합쳐서 더 크다는 점이 핵심.
    "빈 종이로 시작한다고 착각하면, context rot의 진짜 원인을 못 본다."
    다음 슬라이드는 인터랙티브 시각화 — 막대를 쓸어보면서 비율 보여주기.
  </aside>
</section>
