<section data-section="act3" id="gstack-detail">
  <h2>GSTACK <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">— YC CEO가 직접 만든 가상 엔지니어링 팀</span></h2>

  <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box">
      <div class="box-title">정체성</div>
      <ul style="font-size: 0.92em; line-height: 1.65;">
        <li>만든이: <strong>Garry Tan</strong> (YC CEO)</li>
        <li>철학: <strong>가상 엔지니어링 팀</strong> 시뮬레이션. CEO·Eng·Design·DX 시각이 직렬로 검토.</li>
        <li>형태: 23+ 슬래시 커맨드 (skill).</li>
        <li>일화: 본인이 60일에 600K 라인 작성 주장.</li>
      </ul>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">대표 커맨드 (역할별)</div>
      <ul style="font-size: 0.85em; line-height: 1.55;">
        <li><strong>전략</strong>: <span class="kw">/office-hours</span> · <span class="kw">/plan-ceo-review</span></li>
        <li><strong>엔지니어링</strong>: <span class="kw">/plan-eng-review</span> · <span class="kw">/investigate</span> · <span class="kw">/health</span></li>
        <li><strong>디자인</strong>: <span class="kw">/design-consultation</span> · <span class="kw">/design-shotgun</span> · <span class="kw">/design-html</span></li>
        <li><strong>QA · DX</strong>: <span class="kw">/qa</span> · <span class="kw">/devex-review</span> · <span class="kw">/cso</span> (보안)</li>
        <li><strong>출고</strong>: <span class="kw">/ship</span> · <span class="kw">/land-and-deploy</span> · <span class="kw">/canary</span></li>
        <li><strong>도구</strong>: <span class="kw">/browse</span> (헤드리스 브라우저) · <span class="kw">/codex</span> (OpenAI 협업)</li>
      </ul>
    </div>

  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left;">

    <div class="box">
      <div class="box-title">강점</div>
      <ul style="font-size: 0.88em; line-height: 1.5;">
        <li>"제품 사고 → 기술 결정" 강제하는 검토 체인</li>
        <li>실전 출고 워크플로우(/ship → deploy → canary)까지 포함</li>
        <li>디자인 검토(plan-design-review·design-html)가 시각 결과물에 강함</li>
      </ul>
    </div>

    <div class="box">
      <div class="box-title">적합한 팀</div>
      <ul style="font-size: 0.88em; line-height: 1.5;">
        <li>풀스택 1인 또는 소규모 팀</li>
        <li>빠른 prototype + 출고가 필요한 환경</li>
        <li>CEO·Eng·Design 시각을 1인이 흉내내야 하는 상황</li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    <strong>"가상 팀"의 가치는 다관점</strong> — CEO 리뷰는 "이걸 왜 만드냐"를, Eng 리뷰는 "어떻게"를, DX 리뷰는 "다른 개발자에게 어떻게 보이나"를 묻는다.
  </p>

  <small class="source">github.com/garrytan/gstack</small>

  <aside class="notes">
    GSTACK의 핵심 한 줄: "혼자서 팀을 흉내낼 수 있는 23 커맨드."

    Garry Tan 본인의 사용 사례가 이 도구의 정당화. YC CEO가 60일에 600K 라인이라는 주장은 검증하기 어렵지만, 그가 실제로 쓰는 도구라는 사실 자체가 신뢰 신호.

    /office-hours가 가장 도입 쉬운 진입점 — 청중에게 "한 커맨드만 써본다면 이거"로 추천.

    /codex가 흥미로운 디테일 — Claude Code 안에서 OpenAI Codex 호출해 "두 모델의 의견" 비교. 모델 다양성을 워크플로우에 내장.

    /design-shotgun (여러 디자인 변형 동시 생성), /design-html (Pretext-native HTML 출력)도 시니어 청중이 "이게 가능해?" 반응할 만한 디테일.

    이 슬라이드 다음에 OMO(03-07c) → 통합 사용(03-08).

    예상 질문: "Claude Code 외에서도?" → universal하게 설계됨, Codex/Cursor/Gemini에서도 동작.
  </aside>
</section>
