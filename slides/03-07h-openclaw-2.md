<section data-section="act3" id="openclaw-detail-2">
  <h2>OpenClaw ② <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— 사용자 한마디 → 4 에이전트 파이프라인</span></h2>

  <div class="box" style="text-align: center; padding: 10px 22px; max-width: 1300px; margin: var(--space-sm) auto 0;">
    <div class="box-title">예시 명령 (Slack DM, 한 줄)</div>
    <p style="font-size: 0.95em; margin: 4px 0; font-family: var(--font-mono);">
      "경쟁사 15곳 가격을 매주 추적해서 변경 있으면 알려줘"
    </p>
  </div>

  <p style="text-align: center; font-size: 0.82em; opacity: 0.7; margin: 6px 0 0;">
    ↓ daemon이 받음 → ClawdHub에서 가까운 워크플로우 fork → <strong>4 에이전트</strong> 자동 구성
  </p>

  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">① Plan</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        명령 → 실행 계획으로 변환
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>대상: 15 경쟁사 URL</li>
        <li>주기: 매주 월 09:00</li>
        <li>지표: 가격·플랜·한도</li>
      </ul>
    </div>

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">② Execute</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        cron 트리거로 일감 수행
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>Pi 에이전트가 스크래핑</li>
        <li>결과를 로컬 <strong>SQLite</strong>에 적재</li>
        <li>가격 히스토리 누적</li>
      </ul>
    </div>

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">③ Review</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        의미 있는 변경만 골라냄
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>지난주 vs 이번주 diff</li>
        <li>novelty·신뢰도 scoring</li>
        <li>임계 미만은 무시</li>
      </ul>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 12px 16px;">
      <div class="box-title" style="color: var(--accent-secondary);">④ Report</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        결과를 사용자가 받는 곳으로
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>Slack 카드 자동 작성</li>
        <li>중요도별 채널 분리</li>
        <li>주간 요약은 이메일</li>
      </ul>
    </div>

  </div>

  <div class="box" style="margin-top: var(--space-sm); border-left-color: var(--accent-primary); padding: 12px 22px;">
    <div class="box-title">정착하면서 결과가 좋아지는 방식 (사용자 주도)</div>
    <p style="font-size: 0.84em; line-height: 1.45; margin: 4px 0;">
      ③ Review의 <strong>scoring 가중치</strong>를 사용자가 튜닝 → 노이즈 알림이 줄어든다.
      <span style="opacity:0.85;">(공개 사례: false positive <strong>30% → 8% 미만</strong>으로 감소)</span>
      개선된 워크플로우는 ClawdHub로 다시 push 가능 → 다음 사람이 더 좋은 출발점에서 시작.
    </p>
  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    Hermes의 자가 개선이 <strong>모델이 자기를 갱신</strong>하는 방식이라면, OpenClaw는 <strong>사용자가 가중치를 갱신</strong>하는 방식. 자율성 vs 통제 — 트레이드오프.
  </p>

  <small class="source">openclaw.ai/showcase · ClawdHub · KDnuggets "Practical OpenClaw Use Cases" 2026</small>

  <aside class="notes">
    이 슬라이드 메시지: "한 줄 명령이 어떻게 4-에이전트 파이프라인이 되는지 — 다음 슬라이드의 모든 사례가 이 골격을 공유한다."

    Plan/Execute/Review/Report는 OpenClaw 커뮤니티가 거의 모든 워크플로우에 권장하는 표준 패턴. 그래서 ClawdHub의 1,700+ 워크플로우 중 다수가 이 4-에이전트 골격을 공유. fork → 변수만 바꾸면 다른 use case에 그대로 작동.

    Plan 단계의 핵심 = 모호한 명령("매주 추적")을 구체 파라미터(URL/주기/지표)로 펼침. 잘못 펼치면 뒷 단계 망가지기 때문에 보통 Opus/Sonnet 같은 강한 모델 사용.

    Execute는 cron-driven — 사람이 안 봐도 돈다. SQLite 로컬 적재가 결정적: 클라우드 안 거치므로 프라이버시 OK, 자연어 쿼리("지난달 가장 자주 가격 바꾼 곳?") 가능.

    Review의 scoring weight 튜닝이 흥미 — Hermes가 GEPA로 자동 평가한다면 OpenClaw는 사용자가 직접. "이 알림은 의미 없었어" 표시 → 다음에 같은 패턴 무시. false positive 30% → 8%는 공개 케이스 스터디 숫자.

    Report는 형식만 다르지 본질은 같음 — Slack/이메일/Discord/SMS 등 어디로 가도 됨. 메신저 게이트웨이가 OpenClaw 정체성이라 자연.

    Hermes vs OpenClaw 자가 개선 차이를 callout이 짚음:
    - Hermes = 모델 자가 갱신 (GEPA, ~/.hermes/skills 자동 작성)
    - OpenClaw = 사용자 가중치 튜닝 (명시적, 통제 가능)
    이건 자율성 vs 통제의 트레이드오프 — 청중에 "어느 쪽이 자기 팀 문화에 맞나" 질문 던지면 좋음.

    예상 질문: "Plan 에이전트가 잘못 분해하면?" → 사용자가 한 번 보고 승인하는 단계가 표준. ClawdHub의 좋은 워크플로우는 plan을 보여주고 confirm 받는 패턴.

    예상 질문: "ClawdHub fork한 다음 한 거 어떻게 다시 push?" → 표준 git fork-PR 흐름. 같은 사용자가 여러 번 fork → 자기 레포에 모음.

    다음 슬라이드(③)에서 이 골격이 4가지 다른 use case에서 어떻게 같은 모양으로 작동하는지 보여줌.
  </aside>
</section>
