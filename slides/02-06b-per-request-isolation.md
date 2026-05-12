<section data-section="act2" id="per-request-isolation">
  <h2>Per-request 독립 — 누적은 일어나지 않는다</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    "윈도우가 점점 차오른다"는 직관은 틀렸다. 매 요청은 독립된 1M 한계 안에서 측정된다.
  </p>

  <div class="compare-grid" style="margin-top: var(--space-md);">

    <div style="border-color: var(--accent-danger);">
      <h3 style="color: var(--accent-danger);">❌ 누적 모델 (오해)</h3>
      <p style="font-family: var(--font-mono); font-size: 0.95em; margin: 6px 0;">
        요청1 (80K) + 요청2 (100K) + 요청3 (120K)
      </p>
      <p style="font-family: var(--font-mono); font-size: 0.95em; color: var(--accent-danger); margin: 6px 0;">
        = <strong>300K 점유</strong>
      </p>
      <p style="opacity: 0.7; font-size: 0.85em; margin-top: 6px;">
        "세션 예산이 점점 차오른다"
      </p>
    </div>

    <div style="border-color: var(--accent-secondary);">
      <h3 style="color: var(--accent-secondary);">✅ Per-request 모델 (실제)</h3>
      <p style="font-family: var(--font-mono); font-size: 0.95em; margin: 6px 0;">
        매 요청은 독립 측정.
      </p>
      <p style="font-family: var(--font-mono); font-size: 0.95em; color: var(--accent-secondary); margin: 6px 0;">
        3번째 요청 = <strong>120K만</strong>
      </p>
      <p style="opacity: 0.7; font-size: 0.85em; margin-top: 6px;">
        앞 요청의 점유는 사라짐. 1M 한계도 매 요청마다 리셋.
      </p>
    </div>

  </div>

  <div class="box" style="border-left-color: var(--accent-primary); margin-top: var(--space-md); max-width: 1100px; margin-left: auto; margin-right: auto;">
    <div class="box-title">N번째 요청 입력 토큰</div>
<pre style="margin: 4px 0;"><code class="language-text" data-trim style="font-size: 0.72em;">입력_N = 60K(고정) + 20K × (N-1) + 10K(신규)

  요청 1: 60K + 0   + 10K =  70K  → +출력 10K =  80K
  요청 2: 60K + 20K + 10K =  90K  → +출력 10K = 100K
  요청 3: 60K + 40K + 10K = 110K  → +출력 10K = 120K</code></pre>
  </div>

  <p class="callout" style="margin-top: var(--space-sm);">
    같은 10K 시스템 프롬프트를 10번 보내도 윈도우 점유는 매번 10K. 어디에도 100K는 없다.
  </p>

  <aside class="notes">
    핵심 멘탈 모델: 컨텍스트 윈도우는 RAM처럼 차오르는 버퍼가 아니라 매 우편 봉투의 크기 한도.

    시니어 청중도 자주 헷갈리는 포인트:
    - "1M 컨텍스트인데 왜 빨리 차냐?" → 답은 60K 고정 + 매 턴 +20K + 도구 호출 결과 (수십 K).
    - "캐시되니까 CLAUDE.md 크게 써도 되지?" → 비용은 OK지만 윈도우 점유는 그대로 (다음 슬라이드).

    점화식 천천히 짚기. 메시지/응답 페어가 매번 +20K씩 누적되니, 50회면 940K로 한계 근접.
    실제로는 도구 호출 결과(파일 읽기, grep 출력)가 종종 수십 K씩 들어와서 훨씬 빨리 참.
    그래서 auto-compaction이 들어옴 — 다음다음 슬라이드 흐름.
  </aside>
</section>
