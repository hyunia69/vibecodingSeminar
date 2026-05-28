<!-- ============================================================
     RAG 섹션 — Graph RAG편  (04-03)
     Slides 6개: rag-vector-limit · rag-knowledge-graph · rag-graph-rag ·
                 rag-map · rag-roadmap · rag-refs
     BMS 실데이터 SoT 반영 / data-section="rag"
     ============================================================ -->

<!-- S17 -->
<section data-section="rag" id="rag-vector-limit">
  <h2>벡터 검색의 한계</h2>

  <p class="lead" style="margin-top:var(--space-sm);">
    "비슷한"은 잘 찾는다. <strong>관계·다단계 추론</strong>은 다른 문제다.
  </p>

  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-top:var(--space-md);">

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-danger);">
      <div class="box-title" style="color:var(--accent-danger);">✗ 다홉 질문</div>
      <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.55;">
        "E-3002가 발생했을 때 점검해야 할 부품이
        P-1001과 겹치나?"<br>
        <span style="opacity:0.65; font-size:0.9em;">
          두 고장 코드를 동시에 추적해야 — 청크 유사도로 답이 나오지 않는다.
        </span>
      </p>
    </div>

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-danger);">
      <div class="box-title" style="color:var(--accent-danger);">✗ 엔티티 간 관계</div>
      <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.55;">
        "냉매 누출과 필터 막힘의 공통 원인은?"<br>
        <span style="opacity:0.65; font-size:0.9em;">
          각 고장의 원인 노드를 연결해야 — 유사도 점수는 관계를 표현하지 않는다.
        </span>
      </p>
    </div>

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-danger);">
      <div class="box-title" style="color:var(--accent-danger);">✗ 전체 집계·요약</div>
      <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.55;">
        "이 달에 발생한 고장 유형을 모두 정리해줘"<br>
        <span style="opacity:0.65; font-size:0.9em;">
          전체 범위의 일관된 탐색이 필요 — Top-K 검색은 전체를 보장하지 않는다.
        </span>
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    벡터 검색은 <strong>"유사도"</strong>다. <strong>"추론"</strong>이 아니다.<br>
    답에 관계가 필요한 순간, 구조가 필요해진다.
  </p>

  <aside class="notes">
    벡터 검색의 한계를 명확히 짚는 슬라이드. "RAG가 만능이 아니다"는 메시지.
    유사도 점수는 "A와 B가 얼마나 비슷한가"를 알려줄 뿐, 둘 사이의 관계를 알지 못한다.
    다홉: 두 엔티티를 거쳐야 답이 나오는 질문 — 그래프 탐색의 영역.
    집계·요약: "전부 보여줘" 류는 Top-K 한계 안에서 불완전 — 그래프나 DB 쿼리가 맞다.
  </aside>
</section>

<!-- S18 -->
<section data-section="rag" id="rag-knowledge-graph">
  <h2>지식 그래프</h2>

  <p class="lead" style="margin-top:var(--space-xs);">
    엔티티(노드) + 관계(엣지)로 지식을 구조화한다.
  </p>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-top:var(--space-sm); align-items:start;">

    <div class="mermaid" style="font-size:1.15em; min-height:300px;">
%%{init: {'themeVariables': {'fontSize': '20px'}, 'flowchart': {'useMaxWidth': false, 'padding': 20, 'nodeSpacing': 28, 'rankSpacing': 75}}}%%
graph LR
  E3002["E-3002 냉매누출"] -- 증상 --> LP["저압"]
  E3002 -- 원인 --> LEAK["배관 누출"]
  E3002 -- 원인 --> FREEZE["증발기 동결"]
  P1001["P-1001 필터막힘"] -- 증상 --> LF["풍량저하"]
  FREEZE -- 점검 --> FILTER["필터 상태"]
  P1001 -- 관련 --> FILTER
    </div>

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">

      <div class="box" style="padding:14px 20px; margin:0; background:var(--bg-tertiary);">
        <div class="box-title" style="font-size:0.82em;">지식 그래프 구성요소</div>
        <table style="width:100%; font-size:0.8em; border-collapse:collapse; margin-top:8px;">
          <tbody>
            <tr>
              <td style="padding:5px 8px; opacity:0.65; width:70px;">노드</td>
              <td style="padding:5px 8px;">E-3002, P-1001, 저압, 배관 누출 …</td>
            </tr>
            <tr>
              <td style="padding:5px 8px; opacity:0.65;">엣지</td>
              <td style="padding:5px 8px;">증상 / 원인 / 점검 / 관련</td>
            </tr>
            <tr>
              <td style="padding:5px 8px; opacity:0.65;">탐색</td>
              <td style="padding:5px 8px;">노드 → 이웃 → 이웃의 이웃</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="callout" style="margin:0;">
        [BMS] <code style="font-family:var(--font-mono); font-size:0.88em;">fault_catalog.yaml</code>의
        고장–증상–원인 구조가 사실상 이 그래프 — 지금은 <strong>벡터로만</strong> 쓰고 있다.
      </p>

      <div class="box" style="padding:14px 20px; margin:0; opacity:0.9;">
        <p style="font-size:0.82em; margin:0; line-height:1.55;">
          "FREEZE → 점검 → FILTER"와 "P-1001 → 관련 → FILTER"<br>
          이 연결은 <strong>청크 유사도로는 도출 불가</strong> — 관계 정의가 필요하다.
        </p>
      </div>

    </div>

  </div>

  <aside class="notes">
    핵심: 그래프는 명시적 관계를 저장한다. 벡터는 암묵적 유사도를 저장한다.
    BMS fault_catalog.yaml에 이미 고장 코드, 증상, 원인이 정의되어 있다 — 그래프의 스키마가 이미 있는 셈.
    도입 비용: 엔티티 추출 자동화, 관계 정의, 그래프 DB(Neo4j 등) 운영.
    도메인이 "관계 중심"일 때 가치 — 설비 진단, 의료 지식, 법령 체계 등.
  </aside>
</section>

<!-- S19 -->
<section data-section="rag" id="rag-graph-rag">
  <h2>Graph RAG</h2>

  <p class="lead" style="margin-top:var(--space-xs);">
    진입은 벡터, 확장은 그래프.
  </p>

  <div style="display:flex; align-items:stretch; justify-content:center; gap:0; margin-top:var(--space-md);">

    <div style="flex:0 0 120px; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:22px 16px; text-align:center; font-size:0.9em; line-height:1.7; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--accent-primary);">질문</div>

    <div style="flex:0 0 60px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:22px 18px; text-align:center; font-size:0.88em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary);">벡터 검색</div>
      <div style="opacity:0.8; font-size:0.88em;">진입 노드 탐색</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; font-size:0.76em; opacity:0.7; text-align:center; word-break:keep-all;">
      <div style="font-size:1.4em; color:var(--accent-primary); line-height:1;">→</div>
      <div>유사 엔티티</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:2px solid var(--accent-secondary); border-radius:8px; padding:22px 18px; text-align:center; font-size:0.88em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-secondary);">그래프 이웃 확장</div>
      <div style="opacity:0.8; font-size:0.88em;">관계 따라 탐색</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; font-size:0.76em; opacity:0.7; text-align:center; word-break:keep-all;">
      <div style="font-size:1.4em; color:var(--accent-primary); line-height:1;">→</div>
      <div>관련 노드·엣지</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:2px solid var(--accent-secondary); border-radius:8px; padding:22px 18px; text-align:center; font-size:0.88em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-secondary);">컨텍스트 수집</div>
      <div style="opacity:0.8; font-size:0.88em;">구조화된 사실</div>
    </div>

    <div style="flex:0 0 60px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:22px 18px; text-align:center; font-size:0.88em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary);">LLM</div>
      <div style="opacity:0.8; font-size:0.88em;">답변 생성</div>
    </div>

    <div style="flex:0 0 60px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:22px 18px; text-align:center; font-size:0.88em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary);">답변</div>
      <div style="opacity:0.8; font-size:0.88em;">+ 경로 인용</div>
    </div>

  </div>

  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-top:var(--space-md);">

    <div class="box" style="padding:16px 20px; margin:0; border-left-color:var(--accent-secondary);">
      <div class="box-title" style="color:var(--accent-secondary);">강점</div>
      <ul style="font-size:0.8em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.65;">
        <li>다홉 관계 추론</li>
        <li>집계·요약 질문</li>
        <li>엔티티 중심 탐색</li>
      </ul>
    </div>

    <div class="box" style="padding:16px 20px; margin:0;">
      <div class="box-title">비용</div>
      <ul style="font-size:0.8em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.65;">
        <li>엔티티 추출 파이프라인</li>
        <li>그래프 DB 운영</li>
        <li>관계 스키마 설계</li>
      </ul>
    </div>

    <div class="box" style="padding:16px 20px; margin:0; background:var(--bg-tertiary);">
      <div class="box-title">BMS라면</div>
      <p style="font-size:0.8em; margin:var(--space-xs) 0 0; line-height:1.55;">
        fault_catalog.yaml → 노드·엣지 자동 추출.<br>
        "공통 원인", "연관 고장" 질문에 대응 가능해진다.
      </p>
    </div>

  </div>

  <small class="source">— Microsoft GraphRAG (2024)</small>

  <aside class="notes">
    "진입은 벡터, 확장은 그래프"가 Graph RAG의 핵심 아이디어.
    벡터로 시작 노드를 잡고, 그래프 이웃을 따라가며 맥락을 쌓는다.
    Microsoft GraphRAG: 커뮤니티 탐지 + 계층적 요약으로 글로벌 요약에 강함.
    구축 비용이 진입 장벽 — 엔티티 추출 자동화가 핵심 난제.
    BMS 맥락: fault_catalog가 이미 구조화된 YAML이라 그래프 변환 비용이 상대적으로 낮을 수 있음.
  </aside>
</section>

<!-- S20 -->
<section data-section="rag" id="rag-map">
  <h2>전체 지도 — 세 접근의 위치</h2>

  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-top:var(--space-md);">

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-primary); background:color-mix(in srgb, var(--accent-primary) 8%, transparent);">
      <div class="box-title" style="color:var(--accent-primary);">Naive RAG ← 현재</div>
      <table style="width:100%; font-size:0.78em; border-collapse:collapse; margin-top:10px; line-height:1.65;">
        <tbody>
          <tr><td style="opacity:0.65; padding:3px 0; width:55px;">무엇</td><td>임베딩→검색→LLM 선형</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">강점</td><td>단순, 빠른 구축, 가시화 쉬움</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">비용</td><td>최소 (벡터 DB + LLM)</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">쓸 때</td><td>명확한 단일 질문, 도메인 문서 Q&amp;A</td></tr>
        </tbody>
      </table>
    </div>

    <div class="box" style="padding:20px 22px; margin:0;">
      <div class="box-title">Agentic RAG</div>
      <table style="width:100%; font-size:0.78em; border-collapse:collapse; margin-top:10px; line-height:1.65;">
        <tbody>
          <tr><td style="opacity:0.65; padding:3px 0; width:55px;">무엇</td><td>에이전트가 검색 전략 결정·반복</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">강점</td><td>불확실한 질문, 다단계 추론</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">비용</td><td>중간 (오케스트레이션 + latency)</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">쓸 때</td><td>질문 범위가 불분명, 반복 검색 필요</td></tr>
        </tbody>
      </table>
    </div>

    <div class="box" style="padding:20px 22px; margin:0;">
      <div class="box-title">Graph RAG</div>
      <table style="width:100%; font-size:0.78em; border-collapse:collapse; margin-top:10px; line-height:1.65;">
        <tbody>
          <tr><td style="opacity:0.65; padding:3px 0; width:55px;">무엇</td><td>그래프 탐색 + 벡터 결합</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">강점</td><td>관계 추론, 집계, 다홉</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">비용</td><td>높음 (그래프 구축·운영)</td></tr>
          <tr><td style="opacity:0.65; padding:3px 0;">쓸 때</td><td>도메인이 관계 중심, 엔티티 간 질문</td></tr>
        </tbody>
      </table>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    사다리가 아니라 <strong>선택지</strong>다. 대부분의 도메인 Q&amp;A는 Naive로 충분하다.<br>
    문제가 요구하는 구조가 무엇인지가 선택 기준.
  </p>

  <aside class="notes">
    "Graph RAG가 더 좋다"는 게 아니라 "더 복잡하다"는 것.
    단계별 진화 프레임은 위험 — 각각 다른 문제를 풀도록 설계된 도구.
    BMS 현재 위치: Naive. 5노드 가시화, Activepieces, FastAPI 봇 — 전부 Naive RAG 위에서 돌아간다.
    언제 Agentic이 필요한가: 질문을 받고 나서야 어떤 문서를 볼지 판단해야 하는 경우.
    언제 Graph가 필요한가: 답이 엔티티 관계에 있고, 그 관계가 명시적으로 정의되어야 하는 경우.
  </aside>
</section>

<!-- S21 -->
<section data-section="rag" id="rag-roadmap">
  <h2>BMS RAG 로드맵</h2>

  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-top:var(--space-md); align-items:start;">

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-secondary); background:color-mix(in srgb, var(--accent-secondary) 8%, transparent);">
      <div class="box-title" style="color:var(--accent-secondary);">&#10003; 완료</div>
      <ul style="font-size:0.82em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
        <li>스키마 + pgvector</li>
        <li>인덱싱 (7문서 / 37청크)</li>
        <li>검색 eval recall 100%</li>
        <li>답변 가드 5종 12/12</li>
        <li><strong>5노드 가시화</strong> (Activepieces)</li>
        <li>Slack 봇 E2E 왕복</li>
      </ul>
    </div>

    <div class="box" style="padding:20px 22px; margin:0; border-left-color:var(--accent-primary); background:color-mix(in srgb, var(--accent-primary) 10%, transparent);">
      <div class="box-title" style="color:var(--accent-primary);">&#9633; 다음</div>
      <ul style="font-size:0.82em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
        <li>로그 시뮬레이터 (T6)</li>
        <li>고장 자동 감지 (T8)</li>
        <li>Slack 알림 발송</li>
        <li style="opacity:0.6; font-size:0.9em;">flow1: 감지→알림 파이프라인</li>
      </ul>
    </div>

    <div class="box" style="padding:20px 22px; margin:0; opacity:0.75;">
      <div class="box-title">더 나아가면</div>
      <ul style="font-size:0.82em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
        <li>Agentic 재검색</li>
        <li>Graph 관계추론</li>
        <li>멀티모달 (센서 이미지)</li>
        <li style="opacity:0.6; font-size:0.9em;">문제가 요구할 때</li>
      </ul>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    가시화로 RAG 내부를 이해했으니, 다음은 이 위에 <strong>무엇을 얹을지</strong>.<br>
    학습 → 구현 → 확장의 자연스러운 흐름.
  </p>

  <aside class="notes">
    로드맵의 핵심 메시지: "다음 단계는 자동화(감지·알림)"이고 "Agentic·Graph는 그 다음 필요하면".
    T6 시뮬레이터: 실제 BMS 로그 대신 시나리오 기반 가짜 로그 생성.
    T8 감지: 로그에서 고장 패턴 매칭 → fault_catalog 참조 → Slack 알림.
    "더 나아가면"은 선택지지 계획이 아님 — 필요가 생기면.
    Activepieces 가시화가 여기서 다시 유용: 새 노드 추가로 flow1 설계 가능.
  </aside>
</section>

<!-- S22 -->
<section data-section="rag" id="rag-refs">
  <h2>참고자료</h2>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-sm); margin-top:var(--space-md);">

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">

      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title" style="font-size:0.82em;">논문</div>
        <ul style="font-size:0.8em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
          <li>Lewis et al. (2020) — <em>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</em></li>
          <li>Yao et al. (2022) — <em>ReAct: Synergizing Reasoning and Acting in Language Models</em></li>
          <li>Edge et al. (2024) — <em>From Local to Global: A Graph RAG Approach</em> (Microsoft)</li>
        </ul>
      </div>

      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title" style="font-size:0.82em;">공식 문서</div>
        <ul style="font-size:0.8em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
          <li>LangChain RAG 가이드 — <span style="font-family:var(--font-mono); font-size:0.9em;">python.langchain.com</span></li>
          <li>LangGraph 공식 문서 — Agentic 워크플로 레퍼런스</li>
          <li>Supabase pgvector — <span style="font-family:var(--font-mono); font-size:0.9em;">supabase.com/docs/guides/ai</span></li>
        </ul>
      </div>

    </div>

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">

      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <div class="box-title" style="color:var(--accent-secondary); font-size:0.82em;">이 발표의 BMS 작업</div>
        <ul style="font-size:0.8em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.75;">
          <li>임베딩: <span class="kw">text-embedding-3-large @1536d</span></li>
          <li>벡터 DB: Supabase pgvector / HNSW 코사인</li>
          <li>threshold: strict <strong>0.34</strong> / widen <strong>0.30</strong></li>
          <li>가드: 사후 5종 — 12/12 PASS</li>
          <li>가시화: Activepieces 5노드</li>
        </ul>
      </div>

      <div class="box" style="padding:18px 22px; margin:0; text-align:center; background:var(--bg-tertiary);">
        <p style="font-size:1.0em; margin:0; line-height:1.6;">
          질문 환영합니다.
        </p>
        <p style="font-size:0.82em; opacity:0.65; margin:8px 0 0;">
          RAG 구현 / 가시화 / 안전장치 / 다음 단계
        </p>
      </div>

    </div>

  </div>

  <aside class="notes">
    Q&A 진입 슬라이드.
    논문 3편: RAG 원논문(Lewis), ReAct(에이전틱의 시작), GraphRAG(Microsoft).
    LangChain/LangGraph는 실습·참고 코드 검색에 가장 빠른 경로.
    BMS 수치는 직접 측정·실험값 — 재현 가능.
    예상 질문: "왜 threshold를 0.34로 잡았나?", "가시화 노드 더 추가 가능한가?", "Graph RAG는 언제 시작할 건가?".
  </aside>
</section>
