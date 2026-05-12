<section data-section="act3" id="demo3-workflow">
  <h2 style="text-align: left;"><span style="opacity: var(--opacity-secondary); font-size: 0.7em;">DEMO ③ ★</span><br>풀 워크플로우 — 한 줄 idea → 검증된 코드</h2>

  <p class="lead" style="margin-top: var(--space-sm); text-align: left;">
    GStack + Superpowers 의 핵심 skill을 <strong>한 데모에 모두</strong> — 약 25분.
  </p>

  <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: var(--space-md); margin-top: var(--space-sm); text-align: left;">

    <div class="box">
      <div class="box-title">4-단 파이프라인</div>
      <ol style="font-size: 0.85em; line-height: 1.6; margin-top: 6px;">
        <li><strong>Idea → Spec</strong> <span style="opacity:0.55;">(~5분)</span><br>
          <span class="kw">/office-hours</span> — builder mode 6 질문 → <code>spec.md</code>
        </li>
        <li><strong>Spec → Plan</strong> <span style="opacity:0.55;">(~3분)</span><br>
          <span class="kw">/superpowers:writing-plans</span> → bite-sized task N개
        </li>
        <li><strong>Plan → Reviewed Plan</strong> <span style="opacity:0.55;">(~5분)</span><br>
          <span class="kw">/autoplan</span> — CEO+Eng+Design+DX <strong>한 번에</strong>
        </li>
        <li><strong>Plan → Code</strong> <span style="opacity:0.55;">(~9분, 3 task)</span><br>
          <span class="kw">/tdd</span> Task별 Red→정지→Green
        </li>
      </ol>
    </div>

    <div>
      <div class="box-title" style="margin-bottom: 8px;">시작 — 단 한 줄</div>
<pre style="font-size: 0.82em; margin: 0;"><code class="language-bash" data-trim>
$ claude

> /office-hours 히어로 + 랜딩 페이지가
  있는 홈페이지를 만들고 싶다

# 그 뒤로 단계마다 한 줄씩:
> /superpowers:writing-plans @specs/spec.md
> /autoplan @plans/plan.md
> /tdd plan의 Task 1 구현
> /tdd plan의 Task 2 구현
> ...
</code></pre>
      <p style="font-size: 0.82em; opacity: 0.75; margin-top: 8px;">
        각 단계의 <strong>산출물이 다음 단계의 입력</strong>. 산문 brief가 검증된 코드로 흘러간다.
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    Skill들이 <strong>워크플로우로 연결</strong>되는 순간 — 검증·리뷰·테스트가 *주장*이 아니라 *명령*으로 처리된다.
  </p>

  <small class="source">demo/landing/README.md — 리허설 스크립트 포함</small>

  <aside class="notes">
    이 데모는 세미나의 *종합 회수*. 앞에서 본 모든 skill을 한 데모에 묶어 보여준다 — Office Hours(idea exploration), writing-plans(분해), autoplan(4-각 리뷰), TDD(R-G-R + verification).

    핵심 메시지 (이 데모로 보일 것):
    1. *"바이브"는 시작이고 끝은 엔지니어링이다* — 한 줄 입력에서 시작해도 검증된 결과로 끝
    2. *컨텍스트가 왕* — 각 단계 산출물(spec.md, plan.md)이 다음 단계 컨텍스트
    3. *명세가 새 입력* — Spec-Driven Development 의 실제
    4. *병렬* — autoplan이 4개 리뷰를 순차이지만 한 명령으로
    5. *시니어가 더 잘 쓴다* — 각 단계의 결정 게이트에서 시니어가 yes/no 한 번씩

    스테이지별 운영 팁:
    - Office Hours: 발표자가 6개 질문 답을 미리 외워둘 것 — 시간 절약 핵심
    - Autoplan: 가장 인상적인 단계. *"사람 팀이 했다면 4시간 미팅"* 멘트로 가치 강조
    - TDD: 2-3개 task만 라이브, 나머지는 "같은 패턴 N번 반복"으로 압축

    리허설 권장: 데모 당일 처음 돌리지 말 것. demo/landing/README.md 에 상세 스크립트.

    실패 시 대처: 시간 초과되면 TDD 단계에서 task 1만 보이고 자르기. spec/plan은 이미 가치 전달 완료.

    이 데모 후 곧장 에필로그(99-01 five-messages)로 진입 — 데모가 5개 메시지 전부 회수한 상태.
  </aside>
</section>
