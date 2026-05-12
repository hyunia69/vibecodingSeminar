<section data-section="act3" id="sdd-tools-workflow">
  <h2 style="font-size: 1.9em; margin-bottom: 0.3em;">SDD 도구 — 실제 사용 흐름</h2>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px; text-align: left; max-width: 1400px; margin-left: auto; margin-right: auto;">

    <div class="box" style="padding: 8px 14px;">
      <div class="box-title">GitHub Spec Kit</div>
      <pre style="font-size: 0.68em; margin: 2px 0; line-height: 1.3;"><code class="language-bash" data-trim>
$ npm i -g @github/spec-kit && specify init
# Claude/Copilot:
/specify "Build auth service"
/plan  →  /tasks  →  /implement
</code></pre>
      <p style="font-size: 0.78em; opacity: 0.85; margin: 4px 0 0; line-height: 1.4;">
        산출물: <code>SPEC.md · PLAN.md · TASKS.md</code> · 표준화 ↑, 작은 작업엔 셰레모니
      </p>
    </div>

    <div class="box" style="padding: 8px 14px;">
      <div class="box-title">BMAD-METHOD</div>
      <pre style="font-size: 0.68em; margin: 2px 0; line-height: 1.3;"><code class="language-text" data-trim>
Analyst → brief.md
PM → prd.md   Architect → architecture.md
PO → stories/   SM → tasks/
Dev → 구현   QA → 검증
</code></pre>
      <p style="font-size: 0.78em; opacity: 0.85; margin: 4px 0 0; line-height: 1.4;">
        역할별 에이전트 + 정보 격리 · 다관점 강제하지만 무거움
      </p>
    </div>

    <div class="box" style="padding: 8px 14px;">
      <div class="box-title">Kiro (AWS)</div>
      <pre style="font-size: 0.68em; margin: 2px 0; line-height: 1.3;"><code class="language-text" data-trim>
IDE panel → Feature 입력
→ requirements.md (EARS: "WHEN X THEN Y SHALL Z")
→ design.md  →  tasks.md
+ Hooks (저장 시 자동 검증)
</code></pre>
      <p style="font-size: 0.78em; opacity: 0.85; margin: 4px 0 0; line-height: 1.4;">
        <code>.kiro/specs/&lt;feature&gt;/</code> · EARS로 모호성 차단, AWS 색깔
      </p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 8px 14px;">
      <div class="box-title" style="color: var(--accent-secondary);">Anthropic superpowers ★</div>
      <pre style="font-size: 0.68em; margin: 2px 0; line-height: 1.3;"><code class="language-text" data-trim>
/skill brainstorming     → specs/*.md
/skill writing-plans     → plans/*.md
/skill subagent-driven-development
  → 코드 + 자동 검토 게이트
</code></pre>
      <p style="font-size: 0.78em; opacity: 0.9; margin: 4px 0 0; line-height: 1.4;">
        Claude Code 통합 · 셰레모니 적당 · ↳ <strong>이번 세미나에서 쓴 그것</strong>
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top: 8px;">
    공통 4단 구조: <strong>spec → plan → execute → verify</strong>. 셰레모니 강도와 IDE 통합 깊이만 다름.
  </p>

  <aside class="notes">
    핵심 교훈: 4 도구 모두 같은 4단 구조 (spec → plan → execute → verify). 차이는 두 축뿐:
    1. 셰레모니 강도 (Spec Kit 中 / BMAD 高 / Kiro 中 / superpowers 低)
    2. 통합 깊이 (CLI / 멀티 에이전트 / IDE / Claude Code 네이티브)

    팀 도입 가이드 (질문 받으면):
    - 처음 시작 → superpowers (Claude Code 있으면 zero-cost) 또는 OpenSpec(한 장)
    - 표준화 단계 → Spec Kit 추가
    - 큰 조직, 다관점 필요 → BMAD 검토
    - AWS 환경 → Kiro 자연스러움

    실은 도구보다 더 중요한 건 문화:
    - spec을 git에 둔다
    - PR에 spec 변경이 코드 변경과 함께 들어간다
    - 리뷰가 "라인 검증"이 아니라 "의도 검증"으로 격상된다

    예상 질문: "그래서 우리 회사는 뭘 써야?"
    → Claude Code 환경이면 superpowers부터. 아니면 Spec Kit. BMAD는 50인+ 조직에서 의미 있음. Kiro는 AWS-heavy 팀에 자연스러움.

    예상 질문: "그냥 ChatGPT/Cursor에 spec 붙여넣으면 안 되나?"
    → 됨. 도구 없이도 SDD 가능. 도구는 "워크플로우 표준화"와 "검토 자동화"에 가치. 작은 팀은 도구 없이 시작하다 도입.
  </aside>
</section>
