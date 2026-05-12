<section data-section="act2" id="worktree-mechanism">
  <h2>git worktree — 그 마법</h2>

  <p class="lead" style="margin-bottom: var(--space-md);">
    하나의 git 데이터베이스, <strong>여러 작업 디렉터리</strong>.
  </p>

  <div style="text-align: left; max-width: 1300px; margin: 0 auto;">

    <pre><code class="language-bash" data-trim>
# 사람이 여러 worktree를 동시에 띄울 때
$ git worktree add ../wt-payments  feature/payments
$ git worktree add ../wt-auth      bugfix/auth

# 같은 git 객체 공유 — clone과 달리 새 디렉터리 비용이 거의 없다
</code></pre>

    <pre><code class="language-typescript" data-trim>
// Claude Code가 서브에이전트를 격리할 때
Agent({
  description: "...",
  isolation: "worktree",   // ← 명시 필요. 기본값 아님.
  prompt: "..."
})
</code></pre>

    <div class="callout" style="margin-top: var(--space-md); border-left-color: var(--accent-warning, #e8a33d);">
      <strong>주의:</strong> Claude는 멀티 에이전트 지시를 받아도 <strong>자동으로 worktree를 쓰지 않는다</strong>.
      <code>isolation: "worktree"</code>를 명시해야 격리 + 새 브랜치가 자동 생성된다.<br>
      <span style="opacity: 0.85;">머지는 별개 — 메인 에이전트가 diff 받아서 <strong>수동 결정</strong>.</span>
    </div>
  </div>

  <small class="source">git worktree (2.5+, 2016) · Claude Code Agent tool 공식 문서</small>

  <aside class="notes">
    git worktree는 시니어가 알 수도 있고 모를 수도 있음. "git에 이런 게 있다"는 것 자체가 작은 발견.

    핵심 메시지는 두 가지:
    1. worktree는 격리만 제공 — 머지는 사람(또는 메인 에이전트)이 한다.
    2. Claude Code는 기본적으로 같은 디렉터리에서 서브에이전트를 돌린다. "각자 worktree에서 작업해"라고 명시하거나 isolation 파라미터를 박아둬야 격리됨.

    안 박아두면 두 서브에이전트가 같은 파일을 동시에 수정하는 race condition이 생길 수 있다 — 이게 다음 슬라이드(오케스트레이터 패턴)의 출발점.
  </aside>
</section>
