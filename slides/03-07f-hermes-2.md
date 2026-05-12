<section data-section="act3" id="hermes-detail-2">
  <h2>Hermes ② <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— 사용자 명령에서 결과까지의 4단계</span></h2>

  <div class="box" style="text-align: center; padding: 10px 22px; max-width: 1300px; margin: var(--space-sm) auto 0;">
    <div class="box-title">예시 명령</div>
    <p style="font-size: 0.95em; margin: 4px 0; font-family: var(--font-mono);">
      "auth 모듈 리팩토링하고 단위 테스트도 추가해줘"
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: var(--space-sm); text-align: left;">

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">① 분석</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        "이 명령에 어떤 컨텍스트가 필요한가?"
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li><strong>MEMORY.md 조회</strong> — 이 레포 컨벤션·과거 결정</li>
        <li><strong>/skills 매칭</strong> — "refactor-with-tests" 발견</li>
        <li>없으면 Opus가 plan 작성</li>
      </ul>
    </div>

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">② 분해</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        skill에 따라 subtask로 펼침
      </p>
      <ol style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 18px;">
        <li>현 코드 분석</li>
        <li>리팩토링 plan 작성</li>
        <li>구현 (병렬 가능)</li>
        <li>테스트 작성</li>
        <li>독립 리뷰</li>
      </ol>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 12px 16px;">
      <div class="box-title" style="color: var(--accent-secondary);">③ 실행 — 모델·에이전트 라우팅</div>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>①② → Sonnet이 직접 (가벼움)</li>
        <li>③④ → <code>claude -p</code> 위임 (헤비 코딩)</li>
        <li>⑤ → <code>codex review</code> 위임 (독립 의견)</li>
      </ul>
      <p style="font-size: 0.74em; opacity: 0.75; margin: 6px 0 0;">
        Hermes는 메인 사고, 코딩은 다른 에이전트에 함수처럼 호출. 최대 8 worker 병렬.
      </p>
    </div>

    <div class="box" style="padding: 12px 16px;">
      <div class="box-title">④ 종합</div>
      <p style="font-size: 0.78em; line-height: 1.4; margin: 4px 0;">
        결과 합성 + 사용자 보고
      </p>
      <ul style="font-size: 0.76em; line-height: 1.4; margin: 4px 0 0; padding-left: 16px;">
        <li>diff·테스트 결과 묶음</li>
        <li>한 줄 요약 + 위험 신호</li>
        <li>실패 시 retry policy</li>
      </ul>
    </div>

  </div>

  <div class="box" style="margin-top: var(--space-sm); border-left-color: var(--accent-primary); padding: 12px 22px;">
    <div class="box-title">동시에, 백그라운드 — 다음에 더 잘하기 위한 학습 루프</div>
    <p style="font-size: 0.84em; line-height: 1.45; margin: 4px 0;">
      <strong>Pattern Extraction</strong> (5+ tool call마다)
      → <strong>Skill 자동 갱신</strong> <code>~/.hermes/skills/refactor-with-tests.md</code>
      → <strong>GEPA 평가</strong> (15 call마다)
      → <strong>MEMORY.md Nudge</strong> ("이 레포는 인증 모듈에 민감한 듯, 기억할까요?")
    </p>
    <p style="font-size: 0.82em; opacity: 0.8; margin: 4px 0 0;">
      Day 30의 Hermes는 같은 명령을 받아도 ① 분석이 더 빠르고 ② 분해가 더 정확하다 — 반복 작업 <strong>~40% 단축</strong>.
    </p>
  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    한 번 명령 → 4단계 실행 + 백그라운드 학습. 사용자는 결과만 받지만 시스템은 매번 진화한다.
  </p>

  <small class="source">Hermes Agent Docs — Skills · Memory · Autonomous Agents 위임</small>

  <aside class="notes">
    이 슬라이드는 Hermes의 핵심. 메시지: "한 줄 명령이 어떻게 4단계 + 백그라운드 학습으로 풀리는지 보여준다."

    ① 분석의 핵심은 MEMORY.md + /skills 두 데이터 소스 조회. Hermes가 skill을 못 찾으면 그제야 모델에게 plan을 시킨다 — 캐싱 효과로 비용 절약.

    ② 분해는 skill이 정의한 골격을 따른다. skill이 없으면 Opus가 즉석 작성. 보통 5-7 subtask로 나눔.

    ③ 실행이 시그니처 — 메인 모델은 사고만 하고, 헤비 코딩은 Claude Code에 위임 (claude -p), 독립 검토는 Codex에 위임. 이게 "에이전트를 함수처럼 호출"의 의미. --max-turns/--max-budget-usd로 비용 상한 강제.

    ④ 종합은 다른 에이전트들의 출력을 사용자가 보기 좋게 패키징. diff + 테스트 결과 + 한 줄 요약. 실패 시 자동 retry.

    백그라운드 학습 루프 (가장 중요한 메시지):
    - Pattern Extraction은 작업 중 자동. 사용자 인지 없이 진행.
    - Skill 자동 갱신: ~/.hermes/skills/<name>.md 파일이 매 작업마다 살짝씩 다듬어짐.
    - GEPA 평가: 15 tool call마다 자기 출력 평가. 효율적인 패턴은 강화, 낭비는 제거.
    - MEMORY.md Nudge: 새 사실 발견 시 사용자에 "기억할까요?" 동의 후 추가.

    "Day 30의 Hermes는 다른 도구"라는 점이 청중에 가장 강한 임팩트. ~40% 단축은 자체 보고 수치 — 청중이 회의적일 수 있어 "진짜인지는 직접 써봐야 안다"는 톤으로.

    보안 경고 (반드시 멘션): ③ 실행 단계에서 Claude Code/Codex 위임은 권한이 매우 강함. 메신저 게이트웨이를 통해 호출되면 Replit 사고 같은 위험 (1막). /permission strict + --max-turns/--max-budget-usd + workdir 격리가 디폴트로 켜져 있어야 함.

    예상 질문: "Hermes가 무한 루프 도는 위험은?" → ③에서 --max-turns 강제, ④에서 retry policy 한계. GEPA 평가가 또 한 차례 안전망.
    예상 질문: "skill이 잘못 학습되면?" → hermes curator (v0.12.0)가 중복·잘못된 skill 통합/폐기 자동.
    예상 질문: "MEMORY.md 민감 정보?" → Nudge 단계가 사용자 동의 게이트. .hermesignore로 디렉터리 격리 가능.

    다음은 OpenClaw — 비슷한 4-단계지만 사람이 직접 가중치를 튜닝하는 다른 철학.
  </aside>
</section>
