<section data-section="act3" id="spec-driven-dev-practice">
  <h2>SDD — Spec 해부와 도구 풍경</h2>

  <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: var(--space-md); margin-top: var(--space-md); text-align: left; max-width: 1500px; margin-left: auto; margin-right: auto;">

    <div class="box">
      <div class="box-title">Spec의 6 섹션 (전형)</div>
      <ul style="font-size: 0.9em; line-height: 1.7;">
        <li><strong>Goal / Why</strong> — 동기, 무엇을 해결하나</li>
        <li><strong>Architecture</strong> — 컴포넌트, 데이터 흐름</li>
        <li><strong>Interface contract</strong> — API 시그니처, 데이터 형태, 에러 포맷</li>
        <li><strong>Acceptance criteria</strong> — "다 됐다"의 정의</li>
        <li><strong>Out of scope</strong> — 명시적으로 <strong>안</strong> 만드는 것</li>
        <li><strong>Open questions</strong> — 미결정 (있어야 정직)</li>
      </ul>
      <p style="font-size: 0.85em; opacity: 0.75; margin-top: var(--space-sm); margin-bottom: 0;">
        형식이 정해져 있어야 AI가 안정 파싱.
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">도구 풍경</div>
      <table style="font-size: 0.82em; border-collapse: collapse; width: 100%;">
        <tbody>
          <tr style="border-bottom: 1px solid rgba(128,128,128,0.2);">
            <td style="padding: 8px 6px; vertical-align: top;"><strong>Spec Kit</strong><br><span style="opacity: 0.7; font-size: 0.85em;">GitHub</span></td>
            <td style="padding: 8px 6px;"><span class="kw">/specify → /plan → /tasks</span> 워크플로우</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(128,128,128,0.2);">
            <td style="padding: 8px 6px; vertical-align: top;"><strong>BMAD</strong></td>
            <td style="padding: 8px 6px;">Analyst·PM·Architect·Dev <strong>역할별</strong> 에이전트</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(128,128,128,0.2);">
            <td style="padding: 8px 6px; vertical-align: top;"><strong>Kiro</strong><br><span style="opacity: 0.7; font-size: 0.85em;">AWS</span></td>
            <td style="padding: 8px 6px;">requirements / design / tasks 3 산출물</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(128,128,128,0.2);">
            <td style="padding: 8px 6px; vertical-align: top;"><strong>OpenSpec</strong></td>
            <td style="padding: 8px 6px;">한 장 <span class="kw">spec.md</span>, 가벼운 시작</td>
          </tr>
          <tr style="border-top: 2px solid var(--accent-secondary);">
            <td style="padding: 8px 6px; vertical-align: top;"><strong>Anthropic superpowers</strong></td>
            <td style="padding: 8px 6px;">brainstorm → spec → plan → execute<br><span style="opacity: 0.85;">↳ <strong>이번 세미나 데모 그 자체</strong></span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    <strong>방금 본 데모도 SDD로 만들었습니다.</strong>
    7개 질문(brainstorming) → spec 문서 → plan 문서(13 task) → 서브에이전트 실행 → 검증.
  </p>

  <small class="source">Augment Code SDD Tools 비교 / Medium "SDD is Eating SE", 2026</small>

  <aside class="notes">
    이 슬라이드의 강력한 모먼트는 마지막 callout — "방금 본 데모는 SDD 산출물의 산출물." 청중에게 메타 모먼트.

    함정 3가지 (시간 있으면 멘트):
    1. <strong>Spec drift</strong> — 코드만 바뀌고 spec 안 업데이트 → 한 달 뒤 spec은 거짓말. 해결: spec도 PR에 같이 묶음.
    2. <strong>Over-spec</strong> — 너무 자세해서 AI 자율 판단 여지 0. 결국 코드 짠 거랑 같음. 해결: "what" 명시, "how" 자율.
    3. <strong>그냥 긴 프롬프트</strong> — acceptance criteria 없으면 spec이 아니고 길어진 프롬프트.

    적용 시점 가이드:
    - <strong>SDD 적합</strong>: 큰 기능, 다중 에이전트, 재사용·재실행 가치 있는 작업
    - <strong>그냥 프롬프트</strong>: 5줄 버그 픽스, 일회용 스크립트, 탐색 단계

    팀 도입 추천 경로:
    1. OpenSpec 스타일(한 장)로 시작 → 진입장벽 낮음
    2. 익숙해지면 Spec Kit 워크플로우 도입
    3. Claude Code 환경이면 Anthropic superpowers 즉시 사용 가능

    예상 질문:
    - "spec이 코드보다 길어지면 의미 있나?" → 짧게 쓰는 훈련. 6 섹션이 한 장 안에 다 들어가도 됨. 우리 demo spec이 약 200줄 (data 참조).
    - "spec 검증은 누가?" → AI가 코드 생성 후 acceptance criteria로 자가 검증 + 사람이 리뷰.
  </aside>
</section>
