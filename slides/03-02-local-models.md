<section data-section="act3" id="local-models">
  <h2>로컬 모델 — 닫힌 모델과의 격차가 좁혀졌다</h2>

  <p class="lead" style="margin-top: var(--space-md);">
    민감 코드는 로컬, 일반 작업은 클라우드.
  </p>

  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-sm); margin-top: var(--space-lg);">

    <div class="box">
      <div class="box-title">DeepSeek V4</div>
      <p style="font-size: 0.9em;">코드 생성·수학 추론에 특화. MoE 아키텍처.</p>
    </div>

    <div class="box">
      <div class="box-title">Kimi K2.6</div>
      <p style="font-size: 0.9em;">긴 컨텍스트와 도구 호출(tool use) 안정성.</p>
    </div>

    <div class="box">
      <div class="box-title">Qwen 3.6 Plus</div>
      <p style="font-size: 0.9em;">에이전트 워크플로우 벤치마크 강세. 다국어 우수.</p>
    </div>

    <div class="box">
      <div class="box-title">GLM 5.1</div>
      <p style="font-size: 0.9em;">추론 + 코드 통합 모델. 로컬 배포 친화적.</p>
    </div>

  </div>

  <blockquote style="margin-top: var(--space-lg); font-size: 1.0em; max-width: 1100px;">
    "오픈 모델은 <strong>구조화된 에이전트 하니스</strong> 안에서 훨씬 더 잘 작동한다."
  </blockquote>

  <p class="callout" style="margin-top: var(--space-md);">
    시나리오 — <strong>민감 코드</strong>는 Ollama + Qwen, <strong>일반 작업</strong>은 Claude Opus 4.7.
  </p>

  <small class="source">MindStudio Best Open Source LLMs 2026</small>

  <aside class="notes">
    핵심은 "선택지가 생겼다"이지 "오픈이 더 낫다"가 아니다.
    민감 코드 — 사내 인증·결제·고객 PII — 는 로컬, 일반 리팩터·문서·테스트는 클라우드.
    하니스가 같으면 모델만 갈아 끼울 수 있다는 점이 OpenCode/Aider의 매력.
    "구조화된 하니스 안에서 더 잘 작동" 인용을 강조 — 모델 크기보다 컨텍스트가 중요.
  </aside>
</section>
