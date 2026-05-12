/* =========================================================
   Theme Switcher
   localStorage는 사용 안 함 (Claude.ai 아티팩트 환경 호환).
   세션 동안 메모리에만 보관.
   ========================================================= */

(function() {
  const THEMES = ['dark', 'light', 'midnight'];
  let currentTheme = 'dark';

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) return;
    currentTheme = theme;

    // 1. body data-attribute (CSS 변수 트리거)
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // 2. CSS 파일 동적 교체
    const link = document.getElementById('theme-stylesheet');
    if (link) {
      link.href = `assets/css/theme-${theme}.css`;
    }

    // 3. 코드 강조 테마도 함께 전환
    const hljsLink = document.getElementById('hljs-theme');
    if (hljsLink) {
      const hljsThemes = {
        dark: 'monokai',
        light: 'github',
        midnight: 'tokyo-night-dark'
      };
      hljsLink.href = `https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/highlight/${hljsThemes[theme]}.min.css`;
    }

    // 4. Mermaid 다이어그램 테마 갱신
    if (window.mermaid) {
      const mermaidTheme = theme === 'light' ? 'default' : 'dark';
      mermaid.initialize({
        startOnLoad: false,
        theme: mermaidTheme,
        themeVariables: { fontFamily: 'Pretendard, sans-serif' }
      });
      // 기존 다이어그램 재렌더 (간단하게: data-processed 제거 후 재실행)
      document.querySelectorAll('.mermaid').forEach(el => {
        el.removeAttribute('data-processed');
        if (el.dataset.original) el.innerHTML = el.dataset.original;
        else el.dataset.original = el.innerHTML;
      });
      setTimeout(() => {
        document.querySelectorAll('.mermaid:not([data-processed])').forEach(el => {
          mermaid.run({ nodes: [el] });
        });
      }, 100);
    }

    // 5. 버튼 active 상태
    document.querySelectorAll('.theme-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    // 6. 시각화 다시 그리기 (테마 색상 변경 반영)
    if (window.renderVisualizations) {
      setTimeout(window.renderVisualizations, 50);
    }
  }

  // 버튼 이벤트
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-switcher button').forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });
    // 초기 테마 적용
    applyTheme(currentTheme);
  });

  // 키보드 단축키: T 키로 테마 순환
  document.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
      // Reveal.js의 다른 단축키 충돌 방지: shift 함께 눌렀을 때만
      if (e.shiftKey) {
        const idx = THEMES.indexOf(currentTheme);
        const next = THEMES[(idx + 1) % THEMES.length];
        applyTheme(next);
      }
    }
  });

  // 외부에서 호출 가능하도록 노출
  window.applyTheme = applyTheme;
  window.getCurrentTheme = () => currentTheme;
})();
