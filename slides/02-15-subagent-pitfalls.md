<section data-section="act2" id="subagent-pitfalls">
  <h2>서브에이전트 — 함정과 베스트 프랙티스</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    병렬 spawn은 강력하지만, 잘못 쓰면 메인 컨텍스트가 더 빨리 폭발한다.
  </p>

  <div class="compare-grid" style="margin-top: var(--space-md);">

    <div style="border-color: var(--accent-danger);">
      <h3 style="color: var(--accent-danger);">함정</h3>
      <ul style="text-align: left; font-size: 0.85em; line-height: 1.45;">
        <li><strong>컨텍스트 누수</strong> — 서브가 코드 본문을 통째로 반환 → 메인 토큰 폭증</li>
        <li><strong>자동 머지 본능</strong> — "yes 받기 전 금지"가 약하면 메인이 임의 진행</li>
        <li><strong>암묵적 충돌</strong> — 사전 격리 없으면 서브들이 같은 파일 동시 수정</li>
        <li><strong>경로 추측</strong> — Task 반환값 무시, 메인 cwd에서 작업 → worktree 격리 무력화</li>
        <li><strong>무한 spawn</strong> — 서브가 또 서브를 만든다 (재귀 깊이 제한 없음)</li>
      </ul>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">베스트 프랙티스</h3>
      <ul style="text-align: left; font-size: 0.85em; line-height: 1.45;">
        <li><strong>사전 직교 설계</strong> — 공유 파일(예: <code>index.js</code>)은 미리 마운트, 서브는 자기 파일만</li>
        <li><strong>구조화된 반환 형식</strong> — <code>## Summary</code> 4–5줄. 코드 본문 금지.</li>
        <li><strong>명시적 yes 게이트</strong> — "yes / 예 / 진행"일 때만 머지. 그 외는 skip.</li>
        <li><strong>테스트 게이트</strong> — 반환 전 <span class="kw">node --test</span> 통과 필수</li>
        <li><strong>반환값 그대로 사용</strong> — Task tool의 worktree path/branch를 추측 없이</li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    서브에이전트는 단순 더하기가 아니다. 메인이 지휘자 역할을 못 하면 비용만 늘어난다.
  </p>

  <small class="source">방금 데모에서 검증된 룰 · <code>demo/CLAUDE.md</code> 참조</small>

  <aside class="notes">
    이 슬라이드가 2막의 마무리. "강력하다, 하지만 조심" 톤.

    데모에서 직접 마주친 함정들을 반영:
    - 자동 머지 본능: 데모용 CLAUDE.md 첫 버전의 "wait for yes" 룰이 약해 코드 리뷰에서 Critical로 잡힘. else-branch를 명시("yes/예/진행만 머지, 나머지는 skip")해서 강화.
    - 경로 추측: Task tool은 worktree path/branch를 반환값에 넣어준다. 룰에 "추측 금지, 반환값 그대로 사용" 명시 필요.
    - 사전 직교 설계: demo/api/src/index.js에 3 라우터를 미리 마운트해서 서브들이 index.js를 안 만지게 함. 충돌 가능성 0.

    예상 질문:
    - "서브가 코드를 반환하면 안 된다는데, 그러면 메인이 결과를 어떻게 봐?" → 메인이 직접 git diff 호출. 코드는 worktree 안에 있고 메인은 필요할 때 들여다본다.
    - "무한 spawn 막는 법?" → CLAUDE.md에 "서브는 또 spawn하지 말 것" 명시. 또는 Task tool 호출 깊이 제한.
    - "테스트 게이트가 너무 엄격하지 않나?" → 데모 같은 짧은 작업엔 적절. 큰 기능엔 단계별 commit + 부분 테스트도 OK.

    이 슬라이드 이후 2막 종료. 휴식 또는 3막(생태계)로 진행.
  </aside>
</section>
