<!-- ============================================================
     RAG 섹션 — 에이전틱편 (04-02 재작성)
     Slides 11–16: Naive 한계 · Agentic RAG · ReAct · 프레임워크 · BMS 확장 · When
     새 슬라이드 추가 시 RAG_SLIDE_XX 주석 패턴을 따를 것
     ============================================================ -->

<!-- RAG_SLIDE_11: Naive RAG의 한계 -->
<section data-section="rag" id="rag-naive-limit">
  <h2>Naive RAG — 한 방에 안 되면 끝</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    검색 1번 → 생성 1번. <span class="kw">선형·고정 파이프라인</span>.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md);">

    <!-- 흐름 도식 -->
    <div class="box" style="padding: 22px 24px;">
      <div class="box-title">파이프라인</div>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: var(--space-sm); flex-wrap: wrap; font-size: 0.85em;">
        <span style="background: var(--bg-tertiary); padding: 7px 14px; border-radius: 8px;">질문</span>
        <span style="color: var(--accent-primary); font-weight: 700;">→</span>
        <span style="background: var(--bg-tertiary); padding: 7px 14px; border-radius: 8px;">임베딩</span>
        <span style="color: var(--accent-primary); font-weight: 700;">→</span>
        <span style="background: var(--bg-tertiary); padding: 7px 14px; border-radius: 8px;">검색</span>
        <span style="color: var(--accent-primary); font-weight: 700;">→</span>
        <span style="background: var(--bg-tertiary); border: 1px solid var(--accent-primary); padding: 7px 14px; border-radius: 8px; font-weight: 600; color: var(--accent-primary);">생성</span>
      </div>
      <div style="margin-top: var(--space-sm); display: flex; flex-direction: column; gap: 6px; font-size: 0.82em; opacity: 0.65;">
        <span>✗ 검색 실패해도 재시도 없음</span>
        <span>✗ 쿼리 고정 — 재작성 없음</span>
        <span>✗ 검색은 코드가 한 번만 실행</span>
      </div>
    </div>

    <!-- 약점 3가지 -->
    <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
      <div class="box" style="border-left-color: var(--accent-danger); padding: 14px 18px; margin: 0;">
        <div class="box-title" style="color: var(--accent-danger); font-size: 0.85em;">모호한 질문</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          "이상해요" → 어떤 청크가 Top-1인지 운에 맡김
        </p>
      </div>
      <div class="box" style="border-left-color: var(--accent-danger); padding: 14px 18px; margin: 0;">
        <div class="box-title" style="color: var(--accent-danger); font-size: 0.85em;">다단계 추론</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          여러 문서를 종합해야 하는 질문은 검색 1회로 커버 불가
        </p>
      </div>
      <div class="box" style="border-left-color: var(--accent-danger); padding: 14px 18px; margin: 0;">
        <div class="box-title" style="color: var(--accent-danger); font-size: 0.85em;">검색 실패 시 복구 없음</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          관련 청크가 threshold 아래면 그대로 "근거없음" 반환
        </p>
      </div>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    [BMS] 발표자의 5노드 플로우 — <code style="font-family: var(--font-mono); font-size: 0.9em;">Webhook → 임베딩 → 검색 → 조립 → LLM</code> — 정확히 이 Naive RAG.
    가드(환각 0·제어지시 0)로 보강했지만, <strong>재검색·쿼리 재작성 없음</strong>.
  </p>

  <aside class="notes">
    발표 포인트: 대부분의 첫 RAG가 여기서 출발한다. 그리고 충분한 경우가 많다 (YAGNI).
    BMS POC도 37청크·5노드로 12/12 eval PASS — Naive로도 실제 운영이 가능함을 보여주는 사례.
    다음 슬라이드부터는 "충분하지 않을 때" 무엇을 추가하는지로 이어짐.
    청중 질문 대비: "그럼 왜 바로 Agentic으로 안 가냐?" → 비용·복잡도·디버깅 난이도.
  </aside>
</section>

<!-- RAG_SLIDE_12: Agentic RAG -->
<section data-section="rag" id="rag-agentic">
  <h2>Agentic RAG — LLM이 루프를 제어한다</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    검색을 <em>코드가 시키냐</em>, <span class="kw">LLM이 시키냐</span>의 차이
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md);">

    <div class="box" style="padding: 20px 22px; margin: 0;">
      <div class="box-title">Naive — 코드가 제어</div>
      <p style="font-size: 0.82em; line-height: 1.55; margin-top: var(--space-xs); opacity: 0.8;">
        고정 파이프라인.<br>
        검색은 코드가 한 번 실행.<br>
        LLM은 생성만 담당.
      </p>
      <div style="margin-top: var(--space-xs); font-size: 0.78em; opacity: 0.6; font-family: var(--font-mono);">
        질문 → 검색 → LLM → 답변 (끝)
      </div>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 20px 22px; margin: 0;">
      <div class="box-title" style="color: var(--accent-secondary);">Agentic — LLM이 제어</div>
      <p style="font-size: 0.82em; line-height: 1.55; margin-top: var(--space-xs);">
        LLM이 스스로 <span class="kw">판단</span>.<br>
        필요하면 <span class="kw">재검색</span>.<br>
        쿼리를 <span class="kw">재작성</span>하거나 도구를 호출.
      </p>
      <div style="margin-top: var(--space-xs); font-size: 0.78em; opacity: 0.6; font-family: var(--font-mono);">
        질문 → LLM → [검색?/재작성?/충분?] → 루프
      </div>
    </div>

  </div>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-sm); margin-top: var(--space-md);">
    <div class="box" style="background: var(--bg-tertiary); padding: 14px 16px; margin: 0; text-align: center;">
      <div style="font-weight: 700; font-size: 0.9em; color: var(--accent-secondary);">판단</div>
      <p style="font-size: 0.78em; margin: 6px 0 0; opacity: 0.75; line-height: 1.4;">지금 근거가 충분한가? 더 검색해야 하는가?</p>
    </div>
    <div class="box" style="background: var(--bg-tertiary); padding: 14px 16px; margin: 0; text-align: center;">
      <div style="font-weight: 700; font-size: 0.9em; color: var(--accent-secondary);">재검색</div>
      <p style="font-size: 0.78em; margin: 6px 0 0; opacity: 0.75; line-height: 1.4;">결과가 약하면 다른 키워드로 다시 벡터 DB를 조회</p>
    </div>
    <div class="box" style="background: var(--bg-tertiary); padding: 14px 16px; margin: 0; text-align: center;">
      <div style="font-weight: 700; font-size: 0.9em; color: var(--accent-secondary);">쿼리 재작성</div>
      <p style="font-size: 0.78em; margin: 6px 0 0; opacity: 0.75; line-height: 1.4;">원래 질문을 검색에 유리한 형태로 LLM이 변환</p>
    </div>
  </div>

  <p style="margin-top: var(--space-md); font-size: 0.88em; opacity: 0.7; text-align: center;">
    비용↑ · 지연↑ &nbsp;/&nbsp; 대신 모호한 질문·복합 추론에 대응 가능
  </p>

  <aside class="notes">
    핵심 구별: "검색을 코드가 시키냐, LLM이 시키냐." 이게 Naive vs Agentic의 본질.
    Agentic이라고 해서 꼭 복잡한 프레임워크가 필요한 건 아님.
    GPT-4o에 tool_choice로 search 도구를 주면 이미 Agentic.
    비용·지연 트레이드오프를 반드시 언급 — Agentic이 항상 좋은 건 아님.
    다음: 가장 대표적인 Agentic 루프 패턴 = ReAct.
  </aside>
</section>

<!-- RAG_SLIDE_13: ReAct 패턴 -->
<section data-section="rag" id="rag-react">
  <h2>ReAct 패턴 — 생각하고 행동하고 관찰한다</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    <strong>Re</strong>asoning + <strong>Act</strong>ion 교차 — Agentic RAG의 대표 루프
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); align-items: start;">

    <!-- ReAct 루프 다이어그램 (HTML/CSS) -->
    <div style="position:relative; padding-right:52px;">

      <div style="display:flex; flex-direction:column; gap:0;">

        <div style="height:88px; background:var(--bg-secondary); border:2px solid var(--accent-primary); border-radius:8px; padding:0 22px; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-weight:700; color:var(--accent-primary); font-size:0.95em;">Thought</div>
          <div style="font-size:0.82em; opacity:0.8; margin-top:4px; line-height:1.4;">생각 — 지금 무엇을 알아야 하는가</div>
        </div>

        <div style="height:36px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">↓</div>

        <div style="height:88px; background:var(--bg-secondary); border:2px solid var(--accent-secondary); border-radius:8px; padding:0 22px; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-weight:700; color:var(--accent-secondary); font-size:0.95em;">Action</div>
          <div style="font-size:0.82em; opacity:0.8; margin-top:4px; line-height:1.4;">검색 / 계산 / 도구 호출</div>
        </div>

        <div style="height:36px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">↓</div>

        <div style="height:88px; background:var(--bg-secondary); border:2px solid var(--accent-primary); border-radius:8px; padding:0 22px; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-weight:700; color:var(--accent-primary); font-size:0.95em;">Observation</div>
          <div style="font-size:0.82em; opacity:0.8; margin-top:4px; line-height:1.4;">결과 관찰</div>
        </div>

        <div style="height:36px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">↓</div>

        <div style="height:88px; background:color-mix(in srgb, var(--accent-secondary) 10%, var(--bg-secondary)); border:2px solid var(--accent-secondary); border-radius:8px; padding:0 22px; display:flex; align-items:center; justify-content:center;">
          <div style="font-weight:700; color:var(--accent-secondary); font-size:0.95em;">충분하면 최종 답변</div>
        </div>

      </div>

      <!-- 루프 화살표: Observation(292px) → Thought(44px) -->
      <!-- 세로선 -->
      <div style="position:absolute; right:14px; top:44px; width:2px; height:248px; background:var(--accent-secondary); opacity:0.75;"></div>
      <!-- 상단 수평선 (Thought 오른쪽) -->
      <div style="position:absolute; right:14px; top:44px; width:38px; height:2px; background:var(--accent-secondary); opacity:0.75;"></div>
      <!-- 하단 수평선 (Observation 오른쪽) -->
      <div style="position:absolute; right:14px; top:292px; width:38px; height:2px; background:var(--accent-secondary); opacity:0.75;"></div>
      <!-- 화살표 머리 ← 방향 (Thought 진입) -->
      <div style="position:absolute; right:50px; top:38px; width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-right:9px solid var(--accent-secondary); opacity:0.75;"></div>

    </div>

    <!-- 단계별 설명 -->
    <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
      <div class="box" style="padding: 14px 18px; margin: 0;">
        <div class="box-title" style="font-size: 0.85em;">Thought (생각)</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          LLM이 현재 상태를 추론. "냉매 정보가 필요하다."
        </p>
      </div>
      <div class="box" style="padding: 14px 18px; margin: 0; border-left-color: var(--accent-secondary);">
        <div class="box-title" style="color: var(--accent-secondary); font-size: 0.85em;">Action (행동)</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          도구 호출. <code style="font-family: var(--font-mono);">search("냉매 누출 증상")</code>
        </p>
      </div>
      <div class="box" style="padding: 14px 18px; margin: 0;">
        <div class="box-title" style="font-size: 0.85em;">Observation (관찰)</div>
        <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.8;">
          검색 결과를 LLM에 피드백. 다음 Thought의 입력이 됨.
        </p>
      </div>
      <div class="box" style="padding: 14px 18px; margin: 0; background: var(--bg-tertiary);">
        <div class="box-title" style="font-size: 0.85em; opacity: 0.7;">루프 탈출 조건</div>
        <p style="font-size: 0.78em; margin: 4px 0 0; line-height: 1.45; opacity: 0.65;">
          "근거 충분" 판단 또는 최대 스텝 도달 (무한루프 방지 필수)
        </p>
      </div>
    </div>

  </div>

  <small class="source">— Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models (2022)</small>

  <aside class="notes">
    ReAct는 논문 이름이기도 하고 패턴 이름이기도 함. Yao et al. 2022.
    핵심: "관찰을 보고 다음 행동을 결정." 이게 Naive와 근본적으로 다른 점.
    구현 시 반드시 최대 스텝 수 설정 — 루프가 끝나지 않는 건 프로덕션에서 치명적.
    LangChain의 AgentExecutor, LangGraph의 루프 노드가 이 패턴의 구현체.
    "생각 → 행동 → 관찰"을 세 단어로 외우면 어디서든 통함.
  </aside>
</section>

<!-- RAG_SLIDE_14: LangChain / LangGraph -->
<section data-section="rag" id="rag-frameworks">
  <h2>LangChain · LangGraph — 코드로 짜는 Agentic RAG</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    같은 그래프 개념 — 코드(LangGraph) vs 캔버스(Activepieces)
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md);">

    <div class="box" style="padding: 20px 22px; margin: 0;">
      <div class="box-title">LangChain — 체인 추상</div>
      <p style="font-size: 0.82em; line-height: 1.55; margin-top: var(--space-xs); opacity: 0.85;">
        Retriever · Prompt · LLM · Parser를<br>
        체인으로 연결하는 고수준 추상.<br>
        <span style="opacity: 0.65; font-size: 0.9em;">단순 선형 파이프라인에 빠름.</span>
      </p>
      <div style="margin-top: var(--space-xs); font-family: var(--font-mono); font-size: 0.75em; opacity: 0.6; line-height: 1.6;">
        chain = retriever | prompt | llm | parser<br>
        chain.invoke({"question": "..."})
      </div>
    </div>

    <div class="box" style="border-left-color: var(--accent-secondary); padding: 20px 22px; margin: 0;">
      <div class="box-title" style="color: var(--accent-secondary);">LangGraph — 상태 그래프</div>
      <p style="font-size: 0.82em; line-height: 1.55; margin-top: var(--space-xs);">
        노드 + 엣지 + <span class="kw">상태(State)</span>.<br>
        분기·루프·재시도를 그래프로 정의.<br>
        <span style="opacity: 0.65; font-size: 0.9em;">Agentic RAG, ReAct 루프 구현에 적합.</span>
      </p>
      <div style="margin-top: var(--space-xs); font-family: var(--font-mono); font-size: 0.75em; opacity: 0.6; line-height: 1.6;">
        graph.add_node("retrieve", retrieve_fn)<br>
        graph.add_edge("retrieve", "grade")<br>
        graph.add_conditional_edges(...)
      </div>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    [BMS] 발표자의 Activepieces는 노코드 오케스트레이션 — LangGraph가 코드로 그리는 그래프를
    캔버스로 가시화한 것. <strong>가시화·학습 목적엔 노코드가 직관적.</strong>
  </p>

  <small class="source">— LangChain / LangGraph 공식 문서 (langchain.com · langchain-ai.github.io/langgraph)</small>

  <aside class="notes">
    LangChain은 2022년 말 등장 후 생태계 표준처럼 자리잡았지만, 추상이 많아 디버깅이 어렵다는 평이 있음.
    LangGraph는 그 대안 — 상태와 전환을 명시적으로 정의해 추적 가능.
    프레임워크 락인 주의: 개념(그래프·상태·도구)을 이해하면 도구는 교체 가능.
    Activepieces 비교는 청중이 BMS 플로우를 이미 봤을 때 특히 효과적.
    "그럼 프로덕션에서 뭘 쓰나?" → 팀 역량·기존 스택에 따라 다름, 정답 없음.
  </aside>
</section>

<!-- RAG_SLIDE_15: 내 플로우를 에이전틱하게 확장하면? -->
<section data-section="rag" id="rag-agentic-bms">
  <h2>내 플로우를 에이전틱하게 확장하면?</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    5노드 Naive에 <span class="kw">판단 노드</span> 하나를 추가하면 루프가 생긴다
  </p>

  <div style="margin-top: var(--space-md);">
    <!-- 플로우차트: 행1=메인파이프라인, 행2=수직연결선, 행3=가로선+쿼리재작성 -->
    <div style="display:grid; grid-template-columns:auto 50px 1fr 50px 1fr 50px 112px 50px 132px 64px 1fr; grid-template-rows:100px 44px 64px; gap:0; width:100%;">

      <!-- ── 행1: 메인 파이프라인 ── -->

      <div style="grid-row:1; grid-column:1; align-self:center; height:62px; padding:0 18px; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9em; color:var(--accent-primary); white-space:nowrap;">질문</div>

      <div style="grid-row:1; grid-column:2; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

      <div style="grid-row:1; grid-column:3; align-self:center; height:62px; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:0 14px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.88em; line-height:1.55; text-align:center;">
        <div style="font-weight:700; color:var(--accent-primary);">임베딩</div>
        <div style="font-size:0.86em; opacity:0.8;">text-embedding-3-large</div>
      </div>

      <div style="grid-row:1; grid-column:4; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

      <div style="grid-row:1; grid-column:5; align-self:center; height:62px; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:0 14px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.88em; line-height:1.55; text-align:center;">
        <div style="font-weight:700; color:var(--accent-primary);">검색</div>
        <div style="font-size:0.86em; opacity:0.8;">match_documents Top-5</div>
      </div>

      <div style="grid-row:1; grid-column:6; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

      <div style="grid-row:1; grid-column:7; align-self:center; height:62px; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:0 12px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.88em; line-height:1.55; text-align:center;">
        <div style="font-weight:700; color:var(--accent-primary);">LLM</div>
        <div style="font-size:0.86em; opacity:0.8; white-space:nowrap;">gpt-4o</div>
      </div>

      <div style="grid-row:1; grid-column:8; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

      <!-- 근거 충분? — 다이아몬드 -->
      <div style="grid-row:1; grid-column:9; align-self:center; height:96px; display:flex; align-items:center; justify-content:center; position:relative;">
        <div style="width:66px; height:66px; border:2px solid var(--accent-secondary); transform:rotate(45deg); background:var(--bg-secondary); position:absolute;"></div>
        <div style="position:relative; z-index:1; width:80px; text-align:center; font-size:0.76em; font-weight:700; color:var(--accent-secondary); line-height:1.3;">근거<br/>충분?</div>
      </div>

      <!-- 예 → -->
      <div style="grid-row:1; grid-column:10; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.82em; gap:2px; color:var(--accent-secondary);">
        <div style="opacity:0.9;">예</div>
        <div style="font-size:1.3em; line-height:1;">→</div>
      </div>

      <!-- 답변 반환 -->
      <div style="grid-row:1; grid-column:11; align-self:center; height:62px; background:color-mix(in srgb, var(--accent-secondary) 12%, var(--bg-secondary)); border:2px solid var(--accent-secondary); border-radius:6px; padding:0 14px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9em; color:var(--accent-secondary); text-align:center;">답변 반환</div>

      <!-- ── 행2~3: 수직 연결선 (임베딩↑ / 판단↓), 행3 중앙까지 ── -->

      <!-- 임베딩 아래 → 행3 가로선까지 + ▲ 화살표(임베딩 진입) -->
      <div style="grid-row:2 / 4; grid-column:3; display:flex; flex-direction:column; align-items:center; justify-content:flex-start;">
        <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-bottom:9px solid var(--accent-secondary); opacity:0.8;"></div>
        <div style="width:2px; height:67px; background:var(--accent-secondary); opacity:0.7;"></div>
      </div>

      <!-- 판단 아래: 아니오 + 수직선 → 행3 가로선까지 -->
      <div style="grid-row:2 / 4; grid-column:9; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; gap:2px;">
        <div style="font-size:0.7em; color:var(--accent-secondary); opacity:0.9; white-space:nowrap;">아니오</div>
        <div style="width:2px; height:60px; background:var(--accent-secondary); opacity:0.7;"></div>
      </div>

      <!-- 행3 가로선: 임베딩(col3) ~ 판단(col9), 중앙 정렬 -->
      <div style="grid-row:3; grid-column:3 / 9; height:2px; align-self:center; background:var(--accent-secondary); opacity:0.7;"></div>

      <!-- 쿼리 재작성: 가로선 위 중앙(검색~LLM 폭) -->
      <div style="grid-row:3; grid-column:5 / 8; align-self:center; z-index:1; height:60px; background:var(--bg-secondary); border:1.5px solid var(--accent-secondary); border-radius:6px; padding:0 16px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.86em; line-height:1.55; text-align:center;">
        <div style="font-weight:700; color:var(--accent-secondary);">쿼리 재작성</div>
        <div style="font-size:0.88em; opacity:0.8;">LLM이 키워드 변환</div>
      </div>

    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md);">
    <div class="box" style="padding: 16px 20px; margin: 0; background: var(--bg-tertiary);">
      <div class="box-title" style="font-size: 0.85em; opacity: 0.7;">현재 (Naive)</div>
      <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45; opacity: 0.7;">
        J(판단) 노드 없음. 검색 결과 부족하면 "근거없음" 반환.
        가드 5종이 2차 방어선.
      </p>
    </div>
    <div class="box" style="padding: 16px 20px; margin: 0; border-left-color: var(--accent-secondary);">
      <div class="box-title" style="color: var(--accent-secondary); font-size: 0.85em;">확장 시</div>
      <p style="font-size: 0.8em; margin: 4px 0 0; line-height: 1.45;">
        "냉매 누출 + 필터 막힘" 복합 질문에 재검색 가능.<br>
        단, 비용↑·지연↑·<strong>무한루프 가드 필수</strong>.
      </p>
    </div>
  </div>

  <aside class="notes">
    이 슬라이드는 앞서 본 BMS 5노드 플로우의 자연스러운 진화를 보여주는 게 목적.
    J 노드(판단)를 추가하는 것이 Naive → Agentic 전환의 가장 작은 단위.
    무한루프 방지: 최대 재시도 횟수 (예: 3회)를 반드시 설정.
    비용 계산: 재검색마다 임베딩 API + LLM 호출 추가. 사전에 예산 추정 필요.
    "언제 이 확장이 필요한가?" → 다음 슬라이드.
  </aside>
</section>

<!-- RAG_SLIDE_16: 언제 Agentic이 필요한가 -->
<section data-section="rag" id="rag-agentic-when">
  <h2>언제 Agentic이 필요한가</h2>

  <p class="lead" style="margin-top: var(--space-sm);">
    Naive로 시작 → <span class="kw">한계를 측정</span> → 그때 Agentic
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md);">

    <div>
      <div style="font-weight: 700; font-size: 0.9em; color: var(--accent-secondary); margin-bottom: var(--space-sm); padding-left: 4px;">
        Agentic이 유효한 경우
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-secondary);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">다단계 추론 — 여러 문서를 종합해야 답이 나오는 질문</p>
        </div>
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-secondary);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">모호한 질문 — 쿼리 재작성 없이는 검색이 계속 빗나감</p>
        </div>
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-secondary);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">도구 호출 — 계산·API·DB 조회가 답변에 필요한 경우</p>
        </div>
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-secondary);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">검색 품질 불안정 — recall이 낮고, 재시도로 커버 가능한 경우</p>
        </div>
      </div>
    </div>

    <div>
      <div style="font-weight: 700; font-size: 0.9em; color: var(--accent-danger); margin-bottom: var(--space-sm); padding-left: 4px;">
        Agentic이 과한 경우
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-danger);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">단순 FAQ — 질문이 명확하고 검색 1회로 충분한 경우</p>
        </div>
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-danger);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">명확한 단일 검색 — recall이 이미 90%+ 이고 지연이 예민한 서비스</p>
        </div>
        <div class="box" style="padding: 12px 16px; margin: 0; border-left-color: var(--accent-danger);">
          <p style="font-size: 0.82em; margin: 0; line-height: 1.45;">처음 구축 단계 — 베이스라인 없이 Agentic부터 짜는 것은 과설계</p>
        </div>
      </div>
    </div>

  </div>

  <p class="callout" style="margin-top: var(--space-md);">
    대부분 Naive로 시작 → 검색 실패율·답변 품질을 <strong>측정</strong> → 한계가 보이면 그때 Agentic 도입.
    처음부터 Agentic은 과설계.
  </p>

  <aside class="notes">
    YAGNI (You Aren't Gonna Need It) 원칙.
    측정이 핵심: 검색 실패율이 5% 이하면 Agentic 없이도 충분.
    판단 근거: eval 12케이스 통과 + recall 100% = BMS는 아직 Naive로 OK.
    Agentic 도입 시 모니터링 비용도 함께 증가 — 추적 가능성(traceability) 확보 필요.
    다음 섹션(04-03)으로 이어지는 브리지: 벡터 검색의 또 다른 한계 — 관계(Graph RAG).
  </aside>
</section>
