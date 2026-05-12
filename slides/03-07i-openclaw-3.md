<section data-section="act3" id="openclaw-detail-3">
  <h2>OpenClaw ③ <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— 사람들이 실제로 이걸로 뭘 하나</span></h2>

  <p class="lead" style="margin-top: var(--space-sm); font-size: 1.1em;">
    공개된 사례 4개. 숫자는 모두 외부 출처에서 확인 가능.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 14px 22px;">
      <div class="box-title">① 경쟁사 가격 추적 — SaaS 창업자 1인</div>
      <p style="font-size: 0.86em; line-height: 1.45; margin: 4px 0;">
        <strong>15개 경쟁사 사이트</strong>를 매주 자동 스크래핑.<br>
        가격·기능 변경 감지하면 Slack에 카드로 게시.
      </p>
      <p style="font-size: 0.92em; margin: 6px 0 0; color: var(--accent-secondary);">
        → 한 경쟁사의 가격 인상을 <strong>뉴스보다 48시간 먼저</strong> 포착
      </p>
    </div>

    <div class="box" style="padding: 14px 22px;">
      <div class="box-title">② 코드 리뷰 자동화 — 팀 개발</div>
      <p style="font-size: 0.86em; line-height: 1.45; margin: 4px 0;">
        PR 올라오면 자동 분석.<br>
        <strong>프로젝트 컨텍스트를 학습</strong>해 레포별 일탈을 감지 (단순 lint 아님).
      </p>
      <p style="font-size: 0.92em; margin: 6px 0 0; color: var(--accent-secondary);">
        → 머지 전 <strong>리뷰 사이클 30% 감소</strong>
      </p>
    </div>

    <div class="box" style="padding: 14px 22px;">
      <div class="box-title">③ 콘텐츠 리서치 + 작성</div>
      <p style="font-size: 0.86em; line-height: 1.45; margin: 4px 0;">
        주제 주면 통계·사례·인용을 자동 수집.<br>
        사람이 빼먹기 쉬운 <strong>수치를 surface</strong>해서 글에 박는다.
      </p>
      <p style="font-size: 0.92em; margin: 6px 0 0; color: var(--accent-secondary);">
        → 검색 랭킹 도달 <strong>4–6주</strong> (수동 작성 글은 8–12주)
      </p>
    </div>

    <div class="box" style="padding: 14px 22px;">
      <div class="box-title">④ CRM 없는 영업 파이프라인</div>
      <p style="font-size: 0.86em; line-height: 1.45; margin: 4px 0;">
        이메일·캘린더 모니터 → 새 연락·대화·미팅을 <strong>로컬 SQLite</strong>에 누적.<br>
        Salesforce·HubSpot 입력 0회.
      </p>
      <p style="font-size: 0.92em; margin: 6px 0 0; color: var(--accent-secondary);">
        → "지난주 만난 사람 누구?" <strong>자연어 쿼리</strong>로 답
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    네 사례 모두 같은 골격 — 앞 슬라이드의 4-에이전트 파이프라인. 시작은 보통 ClawdHub의 1,700+ 워크플로우 중 가까운 것 하나를 fork.
  </p>

  <small class="source">tldl.io · kanerika.com · KDnuggets · Latenode "OpenClaw use cases 2026" · openclaw.ai/showcase</small>

  <aside class="notes">
    이 슬라이드의 메시지: "추상적인 features 나열 대신, 실제 사람들이 무엇을 만들었나의 숫자."

    각 사례 강조점:

    ① 경쟁사 가격 추적 — 시니어 청중이 즉시 공감하는 use case. 핵심은 "사람이 매주 15개 사이트 들어가서 비교하는 일이 0분이 된다." 48시간 선행 포착은 한 일화지만 강한 인상.

    ② 코드 리뷰 자동화 — 우리 데모와 가장 가까운 사례. lint와 다른 점 강조: "이 레포에서는 이런 패턴을 안 쓴다"는 학습이 가능. 30% 감소는 평균치.

    ③ 콘텐츠 — "AI가 글을 쓴다"가 아니라 "사람이 놓치는 수치를 찾아준다"는 프레임이 정확. 4-6주 vs 8-12주는 SEO 도달 시간 (즉, 검색 노출까지의 시간).

    ④ 영업 파이프라인 — 가장 기발한 사례. CRM 같은 무거운 도구 없이, OpenClaw가 이메일/캘린더 보면서 SQLite에 누적. "지난주 만난 김 부장 메모" 같은 자연어 쿼리. local SQLite가 핵심 — 데이터 어디 안 나간다.

    ClawdHub 1,700+ — 이게 OpenClaw의 진짜 가치. 처음 빈 daemon 띄우면 막막하지만, "내 use case에 가까운 워크플로우" 하나 fork해서 customize. 가격 추적, 코드 리뷰 등 위 4개 모두 ClawdHub에 있음.

    공통 패턴 (plan/execute/review/report)이 흥미 — Act 2에서 다룬 오케스트레이터 패턴이 OpenClaw에서도 그대로 등장. 같은 디자인 패턴이 다른 도구에서도.

    보안 환기 (반드시 언급): 메신저 게이트웨이는 권한이 강하다. 1막 Replit 사고 떠올리기. 첫 도입은 read-only 워크플로우(가격 추적, 리서치)부터, 쓰기 작업(PR 생성, 영업 데이터 변경)은 신중히. 2026.03에 CVSS 9.9급 CVE 다수가 공개된 적이 있어 패치 cadence는 반드시 추적.

    예상 질문: "이 숫자들 진짜야?" → 모두 외부 케이스 스터디·블로그 보고치. 자기 조직에서 같은 결과 보장은 아님. 다만 "가능한 게 무엇인가"의 신호.

    이 슬라이드 다음은 03-08(Superpowers + GSTACK 통합 사용)으로 자연스럽게 이어짐.
  </aside>
</section>
