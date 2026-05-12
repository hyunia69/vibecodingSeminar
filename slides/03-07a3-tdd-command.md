<section data-section="act3" id="tdd-command">
  <h2>실전: <span class="kw" style="font-size: 0.85em;">/tdd</span> 한 줄 명령</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    프롬프트 엔지니어링 대신 <strong>슬래시 커맨드</strong>. 발표자가 외울 것은 한 줄.
  </p>

  <div class="box" style="margin-top: var(--space-md); border-left-color: var(--accent-primary); padding: 22px 32px; max-width: 1500px; margin-left: auto; margin-right: auto;">
    <div class="box-title" style="color: var(--accent-primary);">사용 형식</div>
<pre style="font-size: 1.1em; margin: 8px 0 0; background: transparent;"><code class="language-bash" data-trim>
/tdd &lt;기능을 자연어 한 줄로&gt;
</code></pre>
  </div>

  <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-sm); margin-top: var(--space-md); max-width: 1500px; margin-left: auto; margin-right: auto; text-align: left;">

    <div class="box" style="padding: 12px 22px;">
      <div class="box-title" style="font-size: 0.85em;">예시 1 — 신규 기능</div>
<pre style="font-size: 0.85em; margin: 4px 0;"><code class="language-bash" data-trim>
/tdd compareCost(workload) 함수 추가 — 모든 모델 비용 비교, cost 오름차순 정렬
</code></pre>
    </div>

    <div class="box" style="padding: 12px 22px; border-left-color: var(--accent-secondary);">
      <div class="box-title" style="font-size: 0.85em; color: var(--accent-secondary);">예시 2 — 버그 수정 (회귀 테스트 함께)</div>
<pre style="font-size: 0.85em; margin: 4px 0;"><code class="language-bash" data-trim>
/tdd estimateCost 가 문자열 입력에 NaN 을 조용히 반환하는 버그 수정
</code></pre>
    </div>

    <div class="box" style="padding: 12px 22px;">
      <div class="box-title" style="font-size: 0.85em;">예시 3 — 가장 짧은 형태</div>
<pre style="font-size: 0.85em; margin: 4px 0;"><code class="language-bash" data-trim>
/tdd tokenCost 에 cheapestModel(workload) 추가
</code></pre>
    </div>

  </div>

  <p style="margin-top: var(--space-md); font-size: 0.9em; opacity: 0.85; text-align: center;">
    Skill 호출 → 테스트 작성 → <span style="color: var(--accent-danger);"><strong>Red 로그</strong></span> → <strong>정지</strong> → "계속" → 구현 → <span style="color: var(--accent-primary);"><strong>Green 로그</strong></span>
  </p>

  <p class="callout" style="margin-top: var(--space-md);">
    커맨드 본체(<span class="kw">.claude/commands/tdd.md</span>)는 단 한 가지 책무 — <strong>TDD skill 자동 호출 + Red 후 정지</strong>. 나머지는 skill이 처리.
  </p>

  <small class="source">Claude Code custom slash command — project-scoped</small>

  <aside class="notes">
    이 슬라이드의 핵심: "프롬프트 엔지니어링 대신 슬래시 커맨드 한 줄."

    발표자가 외워야 할 것이 *복잡한 TDD 인스트럭션*이 아니라 *한 줄*이라는 것 — 이게 진짜 자동화. 시니어 청중에게 매력적인 포인트.

    내부 구조 한 줄 설명:
    - .claude/commands/tdd.md 가 $ARGUMENTS를 받아서 superpowers:test-driven-development skill을 invoke
    - skill 본문이 R-G-R 강제, verification, 약한 Red 방지 등 디시플린 전부 처리
    - 커맨드는 데모용 "Red 후 정지" 한 줄만 추가

    Why two-layer:
    - Skill = 재사용 가능한 디시플린 정의
    - Slash command = 특정 시나리오(데모, 발표)에 맞춘 호출 패턴
    - 같은 skill을 다른 commands로 다양하게 호출 가능 (예: /tdd-strict, /tdd-fast 등 변형)

    데모 흐름 (이 슬라이드 직후 실제 시연):
    1. Claude Code 열어둔 화면 보여주기
    2. 예시 1 한 줄 타이핑 (실제로 슬라이드의 그 텍스트 그대로)
    3. Red 로그 자동 출현
    4. 정지된 모습 보여주며 청중에게 "여기서 모델이 한 일은?" 질문
    5. "계속" 입력 후 Green
    6. 마무리: "출력이 증거" 강조

    예상 질문: "skill만 부르면 안 되나? 커맨드는 왜?"
    → Skill은 일반적 디시플린, 커맨드는 데모 특수 요건(정지) 추가 + 한 줄 UX. 둘은 다른 층위.

    예상 질문: "auto-trigger로는 안 되나?"
    → 이론적으로 가능. 실측에서는 모델이 자주 skip — 명시적 invoke가 안전.

    예상 질문: "다른 프로젝트에도 옮기나?"
    → 한 줄 파일이라 가능. .claude/commands/tdd.md 복사 한 번.
  </aside>
</section>
