<section data-section="epilogue" id="checklist">
  <h2>책임 있는 사용 — 배포 전 체크리스트</h2>

  <p class="lead" style="margin-top: var(--space-md); margin-bottom: var(--space-md);">
    Replit 사건이 우리 레포에서 일어나지 않으려면.
  </p>

  <div class="box" style="max-width: 1500px; margin: 0 auto; border-left-color: var(--accent-danger);">
    <div class="box-title" style="color: var(--accent-danger);">머지·배포 게이트</div>
    <ul style="margin-top: var(--space-xs); padding-left: 1.2em; columns: 2; column-gap: var(--space-xl); font-size: 0.86em; line-height: 1.35;">

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>프로덕션 DB 권한은 명시적 승인 게이트 뒤에</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: <span class="kw">settings.json</span>의 <span class="kw">permissions.deny</span>에
          <span class="kw">Bash(psql -h prod*:*)</span> 추가. <span class="kw">PROD_DATABASE_URL</span>은 1Password에만 보관.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>code freeze 상태를 <span class="kw">CLAUDE.md</span>·hooks에 명시</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: CLAUDE.md 상단에 <em>"v2.3 release freeze — 신규 머지 금지 (~11/20)"</em> +
          PreToolUse hook이 <span class="kw">git push origin main</span> 차단.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>시니어 리뷰 없이 머지 금지</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: GitHub branch protection — <span class="kw">Require 1 review</span> +
          <span class="kw">CODEOWNERS</span>에 <code>/migrations/ @hyun</code>.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>자동 테스트 + 보안 스캔 통과를 머지 조건으로</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: CI에 <span class="kw">pnpm test</span>, <span class="kw">gitleaks detect</span>,
          <span class="kw">pnpm audit --audit-level=high</span> 4개 잡 필수.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>스키마 마이그레이션은 백업·롤백 플랜 동봉</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: PR 본문에 <em>"백업: pg_dump 045-before.sql / 롤백: <span class="kw">045_down.sql</span> 실행"</em> 명시.
          드라이런 결과 스크린샷도.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>테스트 환경과 프로덕션을 물리적으로 분리</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: staging은 별도 AWS 계정·VPC. 같은 RDS 인스턴스 공유 금지.
          에이전트 작업은 <span class="kw">dev</span> 브랜치 + <span class="kw">localhost</span>에서만.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>에이전트 결과는 실측으로 검증</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: <em>"테스트 통과"</em>를 받으면
          <span class="kw">pnpm test 2>&1 | tail -30</span> 직접 실행. 로그 첨부 없으면 머지 X.
        </div>
      </li>

      <li style="break-inside: avoid; margin-bottom: 10px;">
        <strong>kill switch — 사고 시 즉시 멈출 단일 버튼</strong>
        <div style="opacity: 0.65; font-size: 0.85em; margin-top: 2px;">
          예: LaunchDarkly 플래그 <span class="kw">agent_writes_enabled</span> 1초 OFF.
          롤백 명령은 <span class="kw">README</span> 최상단 한 줄로.
        </div>
      </li>

    </ul>
  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    이 8개를 그대로 PR 템플릿 체크박스로 옮기자. 추상이 아니라 실행으로.
  </p>

  <small class="source">— Replit 사건 (Jason Lemkin via Twitter, 2025) 회수</small>

  <aside class="notes">
    Replit 사건과 닫는 슬라이드. 1막의 충격을 3막의 실천으로 변환.
    체크리스트 8개 + 항목마다 우리 스택에서 바로 적용 가능한 한 줄 예시.

    포인트:
    - 1번(권한)·2번(freeze): 우리가 이미 쓰는 settings.json / CLAUDE.md / hooks 그대로 활용 가능. 새로 만들 게 아니라 한 줄 추가.
    - 5번(마이그레이션): Replit이 정확히 어겼던 것. 백업·롤백·드라이런 3종 세트.
    - 7번(실측 검증): 에이전트가 "테스트 통과"라고 말하면 실제 로그 본인이 확인 — 거짓말 감지의 기본.
    - 8번(kill switch): feature flag 한 개로 가능. 우리도 도입할 수 있다.

    callout 한 줄 강조: "그대로 PR 템플릿 체크박스로." 추상이 아니라 실행 가능한 8줄.
    이 슬라이드 후 잠깐 침묵하고 Q&A로.
  </aside>
</section>
