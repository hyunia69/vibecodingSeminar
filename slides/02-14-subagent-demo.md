<section data-section="act2" id="subagent-demo">
  <h2>라이브 데모 — 오케스트레이터 패턴</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    메인 1개 → 서브 3개 병렬 spawn → worktree 격리 → 사람이 머지 결정
  </p>

  <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); max-width: 1500px; margin-left: auto; margin-right: auto; text-align: left;">

    <div class="box">
      <div class="box-title">발표자 커맨드 (셸)</div>
      <pre style="margin: 0; font-size: 0.72em;"><code class="language-bash" data-trim>
# 사전: 클린 상태로 리셋
$ bash demo/scripts/reset.sh

# demo/api 안에서 시작 (worktree는 git repo cwd 필요)
$ cd demo/api

# 초기 상태 노출
$ git log --oneline
$ head -30 ../CLAUDE.md
$ head -30 ../prompts/run-demo.md

# 메인 Claude 부팅
$ claude
</code></pre>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">발표자 입력 (Claude Code)</div>

      <p style="margin: var(--space-sm) 0 6px; opacity: 0.8; font-size: 0.82em;">트리거 한 줄:</p>
      <pre style="margin: 0; font-size: 0.72em;"><code class="language-text" data-trim>
../CLAUDE.md의 오케스트레이터 룰을 따라
../prompts/run-demo.md의 작업을 실행해줘.
</code></pre>

      <p style="margin: var(--space-sm) 0 6px; opacity: 0.8; font-size: 0.82em;">머지 승인 (3번):</p>
      <pre style="margin: 0; font-size: 0.78em;"><code class="language-text" data-trim>
yes
</code></pre>

      <p style="margin: var(--space-sm) 0 0; opacity: 0.7; font-size: 0.78em;">
        → 입력 총 6번. 외울 것은 트리거 + yes×3.
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    메인이 자동 수행: Task tool ×3 (병렬) · <code>git worktree list</code> ×2 · <code>git diff</code> ×3 · <code>git merge</code> ×3 · <code>verify.sh</code> · cleanup
  </p>

  <aside class="notes">
    이 데모가 2막의 정점.

    소요 시간: 8–10분. 비중 큼 — 세미나 90–120분 중 단일 데모 최대 비중.

    시각 임팩트 모먼트 4개:
    1. T=1:30 — 메인이 한 메시지 안에 Task tool 3 호출 (코드 블록 청중에게 보임)
    2. T=4:30 — `git worktree list` 출력 → 3 격리 디렉터리 노출
    3. T=4:45–6:30 — 머지 일시정지 ×3 → "자동 아님" 메시지 시각화
    4. T=7:45 — 정리 후 `git worktree list` → 다 사라짐 (auto-cleanup)

    회복 시나리오 (참고):
    - 1개 서브 실패 → 메인이 자동 리포팅, 나머지 2개로 진행. 회고 톤 전환.
    - 2개+ 실패 → ESC → reset → 재실행. 시간 없으면 02-15(함정)로 점프.
    - Wi-Fi 끊김 → Claude 재시작 → reset → 재실행.

    회고 멘트 (8:00–9:00):
    "3 작업, 3 worktree, 3 머지 결정. 메인은 코드 안 짰음 — 분해·위임·검토·머지만. 토큰은 직렬보다 살짝 더, 시간은 1/3."

    이 패턴 외에도 인간이 여러 Claude Code 세션을 병렬로 띄우는 방식도 있지만(slide 02-12의 `git worktree add` 부분), 그건 사람이 오케스트레이션 — 우리가 보여준 건 Claude가 오케스트레이션.

    데모 자료 위치: demo/ 폴더 (CLAUDE.md, prompts/run-demo.md, scripts/{reset,verify}.sh, api/, README.md).
  </aside>
</section>
