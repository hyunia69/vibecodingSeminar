<section data-section="act3" id="hermes-vs-openclaw">
  <h2>신예 두 가지 — Hermes · OpenClaw <span style="opacity:0.6; font-size:0.6em; font-weight:normal;">메시징 게이트웨이라는 새 축</span></h2>

  <p class="lead" style="margin-top: var(--space-sm); font-size: 1.15em;">
    3대장이 IDE 옆에서 일한다면, 이 둘은 <strong>"내가 자리에 없을 때도 일하는 하니스"</strong> — 메신저가 1급 입출력.
  </p>

  <table style="margin-top: var(--space-sm); width: 100%; max-width: 1480px; font-size: 0.74em;">
    <thead>
      <tr>
        <th style="width: 18%; padding: 8px 12px;">축</th>
        <th style="padding: 8px 12px;">Hermes <span style="opacity:0.6; font-size:0.85em;">(Nous Research)</span></th>
        <th style="padding: 8px 12px;">OpenClaw <span style="opacity:0.6; font-size:0.85em;">("the lobster way")</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 6px 12px;"><strong>한 줄 정체성</strong></td>
        <td style="padding: 6px 12px;">"The agent that grows with you" — 자가 개선</td>
        <td style="padding: 6px 12px;">"Personal AI on your own devices" — local-first</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>대표 메커니즘</strong></td>
        <td style="padding: 6px 12px;">GEPA 학습 루프 · 자동 skill 생성 · MEMORY.md</td>
        <td style="padding: 6px 12px;">Local Gateway daemon · Task Brain (SQLite) · Live Canvas</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>모델 정책</strong></td>
        <td style="padding: 6px 12px;">300+ 모델, <span class="kw">/model</span>로 즉시 전환</td>
        <td style="padding: 6px 12px;">OpenRouter 네이티브, 멀티 프로바이더</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>I/O 채널</strong></td>
        <td style="padding: 6px 12px;">CLI·TUI·IDE + 18 메시징</td>
        <td style="padding: 6px 12px;">CLI·Dashboard + 20+ 메시징 + Voice + Canvas</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>보안 디폴트</strong></td>
        <td style="padding: 6px 12px;">Unix-socket RPC sandbox · <span class="kw">/permission</span></td>
        <td style="padding: 6px 12px;">DM pairing 강제 · allowlist · Docker/SSH sandbox</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>킬러 패턴</strong></td>
        <td style="padding: 6px 12px;">Claude Code·Codex를 <strong>tool로 위임</strong></td>
        <td style="padding: 6px 12px;">Voice + Canvas로 <strong>대화·시각</strong> 동시 활용</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>리스크 신호</strong></td>
        <td style="padding: 6px 12px;">신생 (2026.02), 토큰 데이터 비공개</td>
        <td style="padding: 6px 12px;">2026.03 CVSS 9.9 CVE 다수 → 패치 추적 필수</td>
      </tr>
    </tbody>
  </table>

  <p class="callout" style="margin-top: var(--space-sm);">
    공통점은 <strong>채널 다양성</strong>, 차이는 <strong>무엇을 누적하는가</strong> — Hermes는 skill, OpenClaw는 task ledger.
  </p>

  <small class="source">digitalapplied.com/blog · 각 프로젝트 README · 2026</small>

  <aside class="notes">
    이 슬라이드는 다음 4장의 로드맵 — Hermes 2장, OpenClaw 2장이 이어진다.

    "메시징 게이트웨이"가 왜 새 축인지: 3대장은 모두 IDE/터미널 옆에 붙는 도구. 이 둘은 그 가정을 깬다 — Telegram에서 "PR 머지해" 하면 동작. 그래서 워크플로우가 다르고, 위험도 다르다.

    Hermes의 자가 개선(GEPA) vs OpenClaw의 task ledger — 둘 다 "장기 누적"이 디자인 코어지만 누적 단위가 다름. Hermes는 Skill(절차 지식), OpenClaw는 Task(상태). 보완 가능 — 둘 다 쓰는 팀도 있을 듯.

    보안 신호 차이는 청중에 솔직히 알려야 함. OpenClaw 2026.03 CVE 9.9급 다수는 fast-moving 오픈소스의 비용 — 도입 시 패치 cadence 모니터링 필수. Hermes는 신생이라 데이터 부족이 별도 위험.

    다음 슬라이드 흐름: Hermes 정체성/워크플로우 → Hermes 오케스트레이터 → OpenClaw 정체성/워크플로우 → OpenClaw 실전.

    예상 질문: "둘 중 하나만 쓴다면?" → 워크플로우가 메신저 의존이면 OpenClaw(채널 폭이 더 넓음), 장기 프로젝트의 누적 학습이 핵심이면 Hermes.
    예상 질문: "Superpowers/GSTACK과 같이 써도?" → 충돌 없음. 메인 IDE는 Superpowers/GSTACK, 외부 채널 게이트웨이는 Hermes/OpenClaw로 분리 가능.
  </aside>
</section>
