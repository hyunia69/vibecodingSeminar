/* =========================================================
   Visualizations
   1) 컨텍스트 윈도우 해부 (스택 막대 + 호버 정보)
   2) Single vs Multi-agent 비교 다이어그램
   ========================================================= */

(function() {

  // 현재 테마의 색상을 CSS 변수에서 가져오기
  function getThemeColors() {
    const styles = getComputedStyle(document.body);
    return {
      bgPrimary: styles.getPropertyValue('--bg-primary').trim() || '#0f1419',
      bgSecondary: styles.getPropertyValue('--bg-secondary').trim() || '#1a2129',
      bgTertiary: styles.getPropertyValue('--bg-tertiary').trim() || '#252e38',
      textPrimary: styles.getPropertyValue('--text-primary').trim() || '#e6e9ef',
      textSecondary: styles.getPropertyValue('--text-secondary').trim() || '#a8b2bd',
      textMuted: styles.getPropertyValue('--text-muted').trim() || '#6c7783',
      accentPrimary: styles.getPropertyValue('--accent-primary').trim() || '#5dd5c4',
      accentSecondary: styles.getPropertyValue('--accent-secondary').trim() || '#ffb454',
      accentDanger: styles.getPropertyValue('--accent-danger').trim() || '#f07178',
      border: styles.getPropertyValue('--border').trim() || '#2d3640',
    };
  }

  // ============== 1) 컨텍스트 윈도우 시각화 ==============
  // 두 단 구성:
  //   상단 — 1M 전체 윈도우, 사용 4.8%만 강조
  //   하단 — 사용된 47.5K를 5개 segment로 분해한 가로 막대 (라벨·막대·수치 분리)
  function renderContextWindow() {
    const container = document.getElementById('contextWindowViz');
    if (!container) return;

    const c = getThemeColors();
    const total = 1_000_000;
    const used = 47_500;

    const segments = [
      { label: 'System Prompt',   tokens: 5_000,  color: c.accentDanger    },
      { label: 'CLAUDE.md',       tokens: 3_000,  color: c.accentSecondary },
      { label: 'MCP Tool Defs',   tokens: 10_000, color: c.accentPrimary   },
      { label: 'Skills (loaded)', tokens: 5_000,  color: '#a78bfa'         },
      { label: 'Conversation',    tokens: 24_500, color: c.textSecondary   },
    ];

    const w = 1600, h = 760;
    const padX = 60;

    // 상단 — 1M 전체 막대
    const overviewY = 130;
    const overviewH = 50;
    const overviewW = w - padX * 2;
    const usedW = (used / total) * overviewW;

    // 하단 — segment 분해 (가로 막대 5개, 세로 stack)
    const breakdownStartY = 270;
    const segH = 54;
    const segGap = 18;
    const labelColW = 300;
    const tokenColW = 180;
    const segBarX = padX + labelColW + 24;
    const segBarMaxW = w - segBarX - tokenColW - padX;
    const maxTokens = Math.max(...segments.map(s => s.tokens));

    const svg = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:100%;">
        <!-- 타이틀 -->
        <text x="${w/2}" y="50" text-anchor="middle" fill="${c.textPrimary}"
              font-family="Pretendard, sans-serif" font-size="38" font-weight="700">
          Claude Opus 4.7 — 1M Token Window
        </text>
        <text x="${w/2}" y="88" text-anchor="middle" fill="${c.textMuted}"
              font-family="JetBrains Mono, monospace" font-size="22">
          현재 사용: ${used.toLocaleString()} / ${total.toLocaleString()} (${((used/total)*100).toFixed(1)}%)
        </text>

        <!-- 1M 전체 막대 -->
        <rect x="${padX}" y="${overviewY}" width="${overviewW}" height="${overviewH}"
              fill="${c.bgTertiary}" stroke="${c.border}" stroke-width="2" rx="8" />
        <rect x="${padX}" y="${overviewY}" width="${usedW}" height="${overviewH}"
              fill="${c.accentPrimary}" opacity="0.9" rx="8" />
        <text x="${padX + usedW + 16}" y="${overviewY + overviewH/2 + 8}"
              fill="${c.accentPrimary}" font-family="JetBrains Mono, monospace"
              font-size="20" font-weight="700">
          ← 47,500 used
        </text>
        <text x="${padX + overviewW - 16}" y="${overviewY + overviewH/2 + 8}"
              text-anchor="end" fill="${c.textMuted}"
              font-family="JetBrains Mono, monospace" font-size="20" font-style="italic">
          952,500 available
        </text>

        <!-- 구분 안내 -->
        <text x="${w/2}" y="${breakdownStartY - 22}" text-anchor="middle"
              fill="${c.textSecondary}" font-family="Pretendard, sans-serif"
              font-size="22" font-weight="600">
          ↓ 사용 중 47,500의 구성
        </text>

        <!-- 5개 segment 가로 막대 -->
        ${segments.map((seg, i) => {
          const y = breakdownStartY + i * (segH + segGap);
          const barW = (seg.tokens / maxTokens) * segBarMaxW;
          return `
            <circle cx="${padX + 10}" cy="${y + segH/2}" r="9" fill="${seg.color}" />
            <text x="${padX + 32}" y="${y + segH/2 + 8}" fill="${c.textPrimary}"
                  font-family="Pretendard, sans-serif" font-size="22" font-weight="600">
              ${seg.label}
            </text>
            <rect x="${segBarX}" y="${y}" width="${barW}" height="${segH}"
                  fill="${seg.color}" opacity="0.85" rx="6" />
            <text x="${segBarX + barW + 18}" y="${y + segH/2 + 8}" fill="${c.textPrimary}"
                  font-family="JetBrains Mono, monospace" font-size="22" font-weight="700">
              ${seg.tokens.toLocaleString()} tok
            </text>
          `;
        }).join('')}

        <!-- 푸터 -->
        <text x="${padX}" y="${h - 56}" fill="${c.textSecondary}"
              font-family="Pretendard, sans-serif" font-size="20">
          ⓘ 대화가 진행될수록 Conversation이 가장 빠르게 누적된다
        </text>
        <text x="${padX}" y="${h - 24}" fill="${c.accentPrimary}"
              font-family="Pretendard, sans-serif" font-size="22" font-weight="700">
          → 컨텍스트 관리 = 비용 관리 + 품질 관리 (context rot 회피)
        </text>
      </svg>
    `;

    container.innerHTML = svg;
  }

  // ============== 2) Single vs Multi-agent 시각화 ==============
  function renderSingleVsMulti() {
    const container = document.getElementById('singleVsMultiViz');
    if (!container) return;

    const c = getThemeColors();
    const w = 1700, h = 760;

    const svg = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:100%;">
        <defs>
          <marker id="arrow-${getCurrentTheme()}" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${c.textSecondary}"/>
          </marker>
        </defs>

        <!-- 좌: Single Agent -->
        <g transform="translate(40, 40)">
          <text x="380" y="40" text-anchor="middle" fill="${c.textPrimary}"
                font-family="Pretendard, sans-serif" font-size="32" font-weight="700">
            Sequential (단일)
          </text>
          <text x="380" y="74" text-anchor="middle" fill="${c.textMuted}"
                font-family="JetBrains Mono, monospace" font-size="16">
            time = T₁ + T₂ + T₃
          </text>

          <!-- main 세션 -->
          <rect x="280" y="120" width="200" height="80" rx="12"
                fill="${c.bgSecondary}" stroke="${c.accentPrimary}" stroke-width="3"/>
          <text x="380" y="155" text-anchor="middle" fill="${c.accentPrimary}"
                font-family="JetBrains Mono, monospace" font-size="20" font-weight="700">main session</text>
          <text x="380" y="180" text-anchor="middle" fill="${c.textMuted}"
                font-family="Pretendard, sans-serif" font-size="14">200K context</text>

          <!-- 순차 작업들 -->
          ${[
            {y: 260, label: 'Task 1: 인증 추가', t: 'T₁ = 8min'},
            {y: 380, label: 'Task 2: 결제 모듈', t: 'T₂ = 12min'},
            {y: 500, label: 'Task 3: 테스트', t: 'T₃ = 6min'}
          ].map(task => `
            <rect x="240" y="${task.y}" width="280" height="70" rx="10"
                  fill="${c.bgTertiary}" stroke="${c.border}" stroke-width="2"/>
            <text x="380" y="${task.y + 30}" text-anchor="middle" fill="${c.textPrimary}"
                  font-family="Pretendard, sans-serif" font-size="18" font-weight="500">${task.label}</text>
            <text x="380" y="${task.y + 54}" text-anchor="middle" fill="${c.textMuted}"
                  font-family="JetBrains Mono, monospace" font-size="14">${task.t}</text>
          `).join('')}

          <!-- 순차 화살표 -->
          <line x1="380" y1="200" x2="380" y2="260" stroke="${c.textSecondary}" stroke-width="2"
                marker-end="url(#arrow-${getCurrentTheme()})"/>
          <line x1="380" y1="330" x2="380" y2="380" stroke="${c.textSecondary}" stroke-width="2"
                marker-end="url(#arrow-${getCurrentTheme()})"/>
          <line x1="380" y1="450" x2="380" y2="500" stroke="${c.textSecondary}" stroke-width="2"
                marker-end="url(#arrow-${getCurrentTheme()})"/>

          <!-- 합계 -->
          <text x="380" y="640" text-anchor="middle" fill="${c.accentDanger}"
                font-family="JetBrains Mono, monospace" font-size="28" font-weight="700">
            Total: 26 minutes
          </text>
        </g>

        <!-- 가운데 구분선 -->
        <line x1="${w/2}" y1="60" x2="${w/2}" y2="${h - 60}"
              stroke="${c.border}" stroke-width="2" stroke-dasharray="4,8"/>

        <!-- 우: Multi-agent + worktree -->
        <g transform="translate(${w/2 + 40}, 40)">
          <text x="380" y="40" text-anchor="middle" fill="${c.textPrimary}"
                font-family="Pretendard, sans-serif" font-size="32" font-weight="700">
            Parallel (멀티 + worktree)
          </text>
          <text x="380" y="74" text-anchor="middle" fill="${c.textMuted}"
                font-family="JetBrains Mono, monospace" font-size="16">
            time ≈ max(T₁, T₂, T₃)
          </text>

          <!-- Orchestrator -->
          <rect x="280" y="120" width="200" height="80" rx="12"
                fill="${c.bgSecondary}" stroke="${c.accentSecondary}" stroke-width="3"/>
          <text x="380" y="155" text-anchor="middle" fill="${c.accentSecondary}"
                font-family="JetBrains Mono, monospace" font-size="20" font-weight="700">orchestrator</text>
          <text x="380" y="180" text-anchor="middle" fill="${c.textMuted}"
                font-family="Pretendard, sans-serif" font-size="14">delegates &amp; merges</text>

          <!-- 3개 서브에이전트 (병렬) -->
          ${[
            {x: 40,  label: 'subagent A', branch: 'feature/auth',     t: 'T₁ = 8min', color: c.accentPrimary},
            {x: 290, label: 'subagent B', branch: 'feature/payment',  t: 'T₂ = 12min', color: c.accentPrimary},
            {x: 540, label: 'subagent C', branch: 'feature/tests',    t: 'T₃ = 6min', color: c.accentPrimary}
          ].map(sub => `
            <line x1="380" y1="200" x2="${sub.x + 110}" y2="280"
                  stroke="${sub.color}" stroke-width="2"
                  marker-end="url(#arrow-${getCurrentTheme()})"/>

            <rect x="${sub.x}" y="280" width="220" height="70" rx="10"
                  fill="${c.bgTertiary}" stroke="${sub.color}" stroke-width="2"/>
            <text x="${sub.x + 110}" y="310" text-anchor="middle" fill="${sub.color}"
                  font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">${sub.label}</text>
            <text x="${sub.x + 110}" y="332" text-anchor="middle" fill="${c.textMuted}"
                  font-family="JetBrains Mono, monospace" font-size="13">${sub.branch}</text>

            <!-- worktree 표시 -->
            <rect x="${sub.x + 20}" y="380" width="180" height="60" rx="8"
                  fill="${c.bgPrimary}" stroke="${c.border}" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="${sub.x + 110}" y="404" text-anchor="middle" fill="${c.textSecondary}"
                  font-family="JetBrains Mono, monospace" font-size="14">git worktree</text>
            <text x="${sub.x + 110}" y="425" text-anchor="middle" fill="${c.textMuted}"
                  font-family="JetBrains Mono, monospace" font-size="13">isolated context</text>

            <text x="${sub.x + 110}" y="475" text-anchor="middle" fill="${c.textMuted}"
                  font-family="JetBrains Mono, monospace" font-size="13">${sub.t}</text>
          `).join('')}

          <!-- merge 표시 -->
          <text x="380" y="555" text-anchor="middle" fill="${c.textSecondary}"
                font-family="Pretendard, sans-serif" font-size="20">
            ↓ merge results back to main ↓
          </text>

          <!-- 합계 -->
          <text x="380" y="640" text-anchor="middle" fill="${c.accentSecondary}"
                font-family="JetBrains Mono, monospace" font-size="28" font-weight="700">
            Total: ~12 minutes (2.2× faster)
          </text>
        </g>
      </svg>
    `;

    container.innerHTML = svg;
  }

  function getCurrentTheme() {
    return document.body.getAttribute('data-theme') || 'dark';
  }

  // ============== 통합 렌더 함수 ==============
  function renderAll() {
    renderContextWindow();
    renderSingleVsMulti();
  }

  // 외부에서 호출 가능
  window.renderVisualizations = renderAll;

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderAll, 100);
  });
})();
