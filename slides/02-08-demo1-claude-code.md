<section data-section="act2" id="demo1-claude-code">
  <h2>데모 ① — Claude Code 기본기</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    지금부터 라이브 데모. 컨텍스트가 어떻게 차오르는지 직접 본다.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-lg); text-align: left;">

    <div class="box">
      <div class="box-title">시연 순서</div>
      <p><strong>1.</strong> <span class="kw">/init</span> — CLAUDE.md 자동 생성</p>
      <p><strong>2.</strong> <span class="kw">/context</span> — 현재 토큰 사용량</p>
      <p><strong>3.</strong> 작업 한 번 시키기 — 토큰 누적 관찰</p>
      <p><strong>4.</strong> <span class="kw">/context</span> 재호출 — 차이 비교</p>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary);">볼 것</div>
      <p>System / CLAUDE.md / Tools / History 비율</p>
      <p>한 번의 도구 호출이 몇 토큰을 먹는가</p>
      <p>출력이 입력보다 빨리 부푸는 모습</p>
    </div>

  </div>

  <pre style="margin-top: var(--space-md);"><code class="language-bash" data-trim>
$ cd ~/demo-project
$ claude
> /init
> /context
> "src/auth.ts에 이메일 검증 함수 추가해줘"
> /context     # 다시 — 얼마나 늘었나?
</code></pre>

  <aside class="notes">
    노트북을 프로젝터에 띄우고 즉시 시연 모드로.
    /init은 디렉터리를 스캔해서 CLAUDE.md 초안을 만든다 — 5-7초 걸림.
    /context 출력은 화면에 표 형태로 — 손가락으로 짚으면서 설명.
    작업 후 토큰 누적 보여주는 게 핵심. "이게 왜 컨텍스트 관리가 중요한지" 체감.
    실수해도 당황 없이. "이건 실시간이라 가끔 이렇게 됩니다."
  </aside>
</section>
