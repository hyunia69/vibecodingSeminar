<!-- ============================================================
     RAG 섹션 — 개념편  (04-01)
     Slides 10개: rag-why · rag-oneline · rag-flow · rag-components ·
                  rag-chunking · rag-embedding · rag-search ·
                  rag-generate · rag-viz · rag-safety
     BMS 실데이터 SoT 반영 / data-section="rag"
     ============================================================ -->

<!-- ① -->
<section data-section="rag" id="rag-why">
  <h2>왜 <strong>RAG</strong>인가</h2>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-top:var(--space-md);">

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">
      <div class="box-title" style="margin-bottom:4px;">LLM 단독</div>

      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-danger);">
        <span style="color:var(--accent-danger); font-weight:700; margin-right:8px;">✗</span>
        학습 컷오프 이후 정보 없음
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-danger);">
        <span style="color:var(--accent-danger); font-weight:700; margin-right:8px;">✗</span>
        사내·도메인 문서를 모름
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-danger);">
        <span style="color:var(--accent-danger); font-weight:700; margin-right:8px;">✗</span>
        출처 없는 자신감 있는 답변 (환각)
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-danger);">
        <span style="color:var(--accent-danger); font-weight:700; margin-right:8px;">✗</span>
        "어느 문서에서 나온 말이냐?" 불투명
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">
      <div class="box-title" style="margin-bottom:4px;">LLM + RAG</div>

      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <span style="color:var(--accent-secondary); font-weight:700; margin-right:8px;">✓</span>
        DB 업데이트만으로 즉시 최신 정보 반영
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <span style="color:var(--accent-secondary); font-weight:700; margin-right:8px;">✓</span>
        내부 문서를 컨텍스트로 주입
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <span style="color:var(--accent-secondary); font-weight:700; margin-right:8px;">✓</span>
        근거 있을 때만 답변, 없으면 "모름" 명시
      </div>
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <span style="color:var(--accent-secondary); font-weight:700; margin-right:8px;">✓</span>
        각 주장에 chunk_id 인용 — 추적 가능
      </div>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    [BMS] "냉매가 새는데 어떻게 대처하죠?" — 일반 LLM은 우리 장비 문서(E-3002)를 모른다.
  </p>

  <aside class="notes">
    파인튜닝과 자주 대비됨. RAG는 지식을 모델 밖에 두고 주입하는 방식 — 갱신·출처·비용 셋 다 유리.
    파인튜닝은 새 정보마다 재학습·비용 大. RAG는 DB만 교체하면 즉시 반영.
    환각의 무서운 점: 틀려도 자신감 있게 말함. RAG는 근거 없으면 "근거없음" 처리 가능.
  </aside>
</section>

<!-- ② -->
<section data-section="rag" id="rag-oneline">
  <h2>RAG 한 문장</h2>

  <p class="lead" style="margin-top:var(--space-md); font-size:1.25em; line-height:1.5; text-align:center;">
    답하기 전에 <strong>관련 문서를 찾아</strong> 함께 넣어주는 것
  </p>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-top:var(--space-lg); max-width:1100px; margin-left:auto; margin-right:auto;">

    <div class="box" style="text-align:center; padding:var(--space-md) var(--space-sm); border-left-color:var(--accent-danger);">
      <div class="box-title" style="color:var(--accent-danger); text-align:center; margin-bottom:var(--space-sm);">닫힌 책 시험</div>
      <p style="font-size:0.9em; line-height:1.6; margin:0;">
        외운 것만으로 답한다<br>
        <span style="opacity:0.6; font-size:0.88em;">= LLM 단독</span>
      </p>
      <p style="margin-top:var(--space-sm); font-size:0.82em; opacity:0.65;">
        학습 당시 데이터 = 유일한 참고서
      </p>
    </div>

    <div class="box" style="text-align:center; padding:var(--space-md) var(--space-sm); border-left-color:var(--accent-secondary);">
      <div class="box-title" style="color:var(--accent-secondary); text-align:center; margin-bottom:var(--space-sm);">오픈북 시험</div>
      <p style="font-size:0.9em; line-height:1.6; margin:0;">
        질문 받으면 먼저 참고서에서 찾고, 보고 답한다<br>
        <span style="opacity:0.6; font-size:0.88em;">= RAG</span>
      </p>
      <p style="margin-top:var(--space-sm); font-size:0.82em; opacity:0.65;">
        질의 시점에 관련 조각을 컨텍스트로 주입
      </p>
    </div>

  </div>

  <div class="box" style="margin-top:var(--space-lg); text-align:center; padding:var(--space-sm) var(--space-md);">
    <span style="font-family:var(--font-mono); font-size:0.95em; letter-spacing:0.05em;">
      <strong style="color:var(--accent-primary);">R</strong>etrieval&nbsp;
      <span style="opacity:0.4;">+</span>&nbsp;
      <strong style="color:var(--accent-primary);">A</strong>ugmented&nbsp;
      <span style="opacity:0.4;">+</span>&nbsp;
      <strong style="color:var(--accent-primary);">G</strong>eneration
    </span>
    <p style="font-size:0.78em; opacity:0.65; margin:6px 0 0;">찾기 &nbsp;·&nbsp; 보강 &nbsp;·&nbsp; 생성</p>
  </div>

  <aside class="notes">
    RAG라는 약어 분해: Retrieval(검색)로 Augment(보강)한 Generation(생성).
    학생(LLM)의 능력을 바꾸는 게 아니라, 시험 환경(컨텍스트)을 바꾸는 것.
    "컨텍스트에 문서 다 넣으면 되지 않나?" — 비용·속도·품질 문제로 안 됨. 청킹 슬라이드에서 설명.
  </aside>
</section>

<!-- ③ -->
<section data-section="rag" id="rag-flow">
  <h2>동작 흐름 전체</h2>

  <div style="display:flex; flex-direction:column; gap:var(--space-sm); margin-top:var(--space-md);">

    <!-- 색인 파이프라인 -->
    <div style="border:1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent); border-radius:10px; padding:14px 20px; background:color-mix(in srgb, var(--accent-primary) 4%, transparent);">
      <div style="font-size:0.74em; font-family:var(--font-mono); opacity:0.6; margin-bottom:10px;">색인 · offline — 문서 갱신 시 1회</div>
      <div style="display:flex; align-items:stretch; gap:0;">
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">문서</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">청크 분할</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">임베딩 모델</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:2px solid var(--accent-secondary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--accent-secondary);">벡터 DB</div>
      </div>
    </div>

    <!-- 연결 표시 -->
    <div style="font-size:0.74em; opacity:0.5; font-family:var(--font-mono); text-align:center;">↕ 검색 대상 — 벡터 DB에서 유사도 검색으로</div>

    <!-- 질의 파이프라인 -->
    <div style="border:1px solid color-mix(in srgb, var(--accent-secondary) 30%, transparent); border-radius:10px; padding:14px 20px; background:color-mix(in srgb, var(--accent-secondary) 4%, transparent);">
      <div style="font-size:0.74em; font-family:var(--font-mono); opacity:0.6; margin-bottom:10px;">질의 · online — 질문마다</div>
      <div style="display:flex; align-items:stretch; gap:0;">
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">질문</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">임베딩 모델</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:2px solid var(--accent-secondary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--accent-secondary);">유사도 검색</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">프롬프트 조립</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">LLM</div>
        <div style="flex:0 0 50px; display:flex; align-items:center; justify-content:center; font-size:1.4em; color:var(--accent-primary);">→</div>
        <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:6px; padding:18px 14px; text-align:center; font-size:0.88em; line-height:1.6; display:flex; align-items:center; justify-content:center; font-weight:600;">답변 + 출처</div>
      </div>
    </div>

  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-sm); margin-top:var(--space-md);">
    <div class="box" style="padding:14px 20px; margin:0;">
      <div class="box-title">색인 — BMS</div>
      <p style="font-size:0.85em; margin:var(--space-xs) 0 0; line-height:1.5;">
        기술문서 7종 → <span class="kw">##</span> 섹션 단위 → <strong>37 청크</strong><br>
        <span style="opacity:0.65; font-size:0.88em;">text-embedding-3-large @1536d → Supabase pgvector</span>
      </p>
    </div>
    <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
      <div class="box-title" style="color:var(--accent-secondary);">질의 — BMS</div>
      <p style="font-size:0.85em; margin:var(--space-xs) 0 0; line-height:1.5;">
        "냉매가 새는 것 같아요" → 임베딩 → match_documents<br>
        <span style="opacity:0.65; font-size:0.88em;">Top-5 청크 → gpt-4o → E-3002 기반 답변</span>
      </p>
    </div>
  </div>

  <aside class="notes">
    두 트랙의 핵심 차이: 색인은 미리(오프라인), 질의는 매번(온라인).
    임베딩 모델은 양쪽 동일해야 함 — 다른 모델 쓰면 벡터 공간이 달라 검색 실패.
    벡터 DB가 두 트랙의 연결 고리 — 저장소이자 검색 엔진.
  </aside>
</section>

<!-- ④ -->
<section data-section="rag" id="rag-components">
  <h2>기술 컴포넌트 지도</h2>

  <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:var(--space-sm); margin-top:var(--space-md);">

    <div class="box" style="padding:18px 16px; margin:0; text-align:center;">
      <div class="box-title" style="text-align:center; font-size:0.82em;">① 임베딩 모델</div>
      <p style="font-size:0.78em; line-height:1.5; margin:var(--space-xs) 0 0; opacity:0.8;">
        텍스트를 벡터로<br>변환
      </p>
      <p style="font-size:0.72em; margin-top:var(--space-sm); color:var(--accent-primary); line-height:1.4;">
        text-embedding-3-large<br>@1536d
      </p>
    </div>

    <div class="box" style="padding:18px 16px; margin:0; text-align:center;">
      <div class="box-title" style="text-align:center; font-size:0.82em;">② 벡터 DB</div>
      <p style="font-size:0.78em; line-height:1.5; margin:var(--space-xs) 0 0; opacity:0.8;">
        벡터 저장 +<br>유사도 검색
      </p>
      <p style="font-size:0.72em; margin-top:var(--space-sm); color:var(--accent-primary); line-height:1.4;">
        Supabase pgvector<br>HNSW 코사인
      </p>
    </div>

    <div class="box" style="padding:18px 16px; margin:0; text-align:center; border-left-color:var(--accent-secondary);">
      <div class="box-title" style="text-align:center; font-size:0.82em; color:var(--accent-secondary);">③ 검색</div>
      <p style="font-size:0.78em; line-height:1.5; margin:var(--space-xs) 0 0; opacity:0.8;">
        Top-K 코사인<br>threshold 필터
      </p>
      <p style="font-size:0.72em; margin-top:var(--space-sm); color:var(--accent-primary); line-height:1.4;">
        match_documents RPC<br>strict 0.34 / widen 0.30
      </p>
    </div>

    <div class="box" style="padding:18px 16px; margin:0; text-align:center;">
      <div class="box-title" style="text-align:center; font-size:0.82em;">④ LLM</div>
      <p style="font-size:0.78em; line-height:1.5; margin:var(--space-xs) 0 0; opacity:0.8;">
        청크 + 질문으로<br>답변 생성
      </p>
      <p style="font-size:0.72em; margin-top:var(--space-sm); color:var(--accent-primary); line-height:1.4;">
        gpt-4o<br>temperature 0
      </p>
    </div>

    <div class="box" style="padding:18px 16px; margin:0; text-align:center;">
      <div class="box-title" style="text-align:center; font-size:0.82em;">⑤ 오케스트레이션</div>
      <p style="font-size:0.78em; line-height:1.5; margin:var(--space-xs) 0 0; opacity:0.8;">
        단계 연결 +<br>흐름 제어
      </p>
      <p style="font-size:0.72em; margin-top:var(--space-sm); color:var(--accent-primary); line-height:1.4;">
        Activepieces (가시화)<br>FastAPI (실제 봇)
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    컴포넌트는 인터페이스만 맞으면 교체 가능 — 모델 바꿔도 DB 마이그레이션 없이 재인덱싱만.
  </p>

  <aside class="notes">
    각 컴포넌트는 독립적. 임베딩 모델을 교체해도 차원만 동일하게 유지하면 나머지는 그대로.
    BMS에서 Activepieces(가시화)와 FastAPI(실제 봇)이 오케스트레이션 역할을 달리 맡음.
    Activepieces = 학습용 캔버스로 중간 데이터 확인 / FastAPI = 실제 Slack 봇 백엔드.
  </aside>
</section>

<!-- ⑤ -->
<section data-section="rag" id="rag-chunking">
  <h2>청킹 — 왜 자르나</h2>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-top:var(--space-md);">

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">
      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title">① 검색 정밀도</div>
        <p style="font-size:0.85em; margin:var(--space-xs) 0 0; line-height:1.45;">
          큰 문서 = 관련 없는 내용이 딸려옴.<br>작은 조각 = 질문과 맞는 부분만 히트.
        </p>
      </div>
      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title">② 임베딩 입력 한계</div>
        <p style="font-size:0.85em; margin:var(--space-xs) 0 0; line-height:1.45;">
          긴 텍스트일수록 의미가 뭉개짐.<br>섹션 단위일수록 벡터 품질 ↑.
        </p>
      </div>
      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title">③ LLM 컨텍스트 절약</div>
        <p style="font-size:0.85em; margin:var(--space-xs) 0 0; line-height:1.45;">
          필요한 조각만 주면 비용·속도·집중도 모두 개선.
        </p>
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">
      <div class="box" style="padding:14px 20px; margin:0; background:var(--bg-tertiary);">
        <div style="font-size:0.82em; opacity:0.7; margin-bottom:6px;">문서 1개 (M-2001 냉동기매뉴얼)</div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="background:var(--accent-primary); opacity:0.5; height:22px; border-radius:3px; font-size:0.72em; padding:3px 8px;">## 개요</div>
          <div style="background:var(--accent-primary); opacity:0.65; height:22px; border-radius:3px; font-size:0.72em; padding:3px 8px;">## 정기 점검 항목</div>
          <div style="background:var(--accent-primary); opacity:0.8; height:22px; border-radius:3px; font-size:0.72em; padding:3px 8px;">## 이상 증상 대처</div>
          <div style="background:var(--accent-primary); opacity:0.5; height:22px; border-radius:3px; font-size:0.72em; padding:3px 8px;">## 부품 교체 주기</div>
        </div>
        <div style="font-size:0.75em; opacity:0.55; margin-top:8px; text-align:right;">→ <strong>##</strong> 섹션 단위 = 청크 4개</div>
      </div>

      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <div class="box-title" style="color:var(--accent-secondary);">BMS 일화</div>
        <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.5;">
          P-1001에 <span class="kw">## 증상</span> 섹션이 없어 "바람이 약해요" 검색 실패.<br>
          섹션 추가 후 <strong>recall 90% → 100%</strong>.
        </p>
        <p style="font-size:0.78em; opacity:0.65; margin-top:6px;">청킹 설계가 검색 품질을 좌우한다.</p>
      </div>
    </div>

  </div>

  <aside class="notes">
    청크 크기·경계 트레이드오프: 작으면 정밀하지만 맥락이 부족, 크면 맥락은 풍부하지만 노이즈.
    의미 단위(섹션·함수) 청킹이 일반적으로 우수 — BMS가 ## 섹션을 쓴 이유.
    BMS 일화: 코퍼스를 바꾸는 것만으로(재인덱싱 필요) 검색 recall이 극적으로 개선됨.
    "RAG 품질 = 임베딩 모델"이 아니라 "RAG 품질 = 청킹 전략 + 임베딩 모델".
  </aside>
</section>

<!-- ⑥ -->
<section data-section="rag" id="rag-embedding">
  <h2>임베딩 — 텍스트를 벡터로</h2>

  <p class="lead" style="margin-top:var(--space-sm);">
    의미가 가까우면 벡터도 가깝다.
  </p>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-top:var(--space-md); align-items:start;">

    <!-- SVG 2D 의미공간 -->
    <div class="box" style="padding:var(--space-sm); margin:0;">
      <div class="box-title" style="margin-bottom:var(--space-xs);">의미 공간 (2D 투영)</div>
      <svg viewBox="0 0 320 220" style="width:100%; max-height:200px; display:block;">
        <!-- 축 -->
        <line x1="20" y1="200" x2="300" y2="200" stroke="#555" stroke-width="1"/>
        <line x1="20" y1="200" x2="20" y2="20" stroke="#555" stroke-width="1"/>
        <!-- 클러스터: BMS 도메인 -->
        <circle cx="130" cy="80" r="6" fill="#5dd5c4"/>
        <text x="140" y="77" font-size="11" fill="#5dd5c4">냉매 누출</text>
        <circle cx="155" cy="100" r="6" fill="#5dd5c4"/>
        <text x="165" y="103" font-size="11" fill="#5dd5c4">냉매 부족</text>
        <circle cx="110" cy="110" r="6" fill="#5dd5c4"/>
        <text x="120" y="113" font-size="11" fill="#5dd5c4">필터 막힘</text>
        <!-- 비도메인 -->
        <circle cx="255" cy="165" r="6" fill="#a05060"/>
        <text x="222" y="158" font-size="11" fill="#a05060">점심 메뉴</text>
        <circle cx="270" cy="145" r="6" fill="#a05060"/>
        <text x="238" y="140" font-size="11" fill="#a05060">주말 날씨</text>
        <!-- 질문 벡터 -->
        <circle cx="138" cy="95" r="8" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="3"/>
        <text x="100" y="58" font-size="11" fill="#f0b429">질문 벡터</text>
        <line x1="138" y1="87" x2="138" y2="65" stroke="#f0b429" stroke-width="1" stroke-dasharray="2"/>
      </svg>
      <p style="font-size:0.72em; opacity:0.6; margin:4px 0 0; text-align:center;">
        BMS 관련 텍스트끼리 군집 — "점심 메뉴"는 멀리
      </p>
    </div>

    <!-- BMS 실데이터 -->
    <div style="display:flex; flex-direction:column; gap:var(--space-xs);">
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-primary);">
        <div class="box-title">BMS — text-embedding-3-large @1536d</div>
        <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.5;">
          기본 3072d가 아닌 <strong>1536d 고정 계약</strong>.<br>
          색인·질의 양쪽 동일 모델·차원 필수.
        </p>
      </div>
      <div class="box" style="padding:14px 20px; margin:0; background:var(--bg-tertiary);">
        <div class="box-title" style="font-size:0.8em; margin-bottom:6px;">노드2 실제 출력 (앞 5개)</div>
        <code style="font-family:var(--font-mono); font-size:0.75em; line-height:1.6; display:block;">
          [-0.0537, -0.0198, 0.0023,<br>
          &nbsp;0.0331, 0.0401, … <span style="opacity:0.5;">×1536개</span>]
        </code>
      </div>
      <div class="box" style="padding:14px 20px; margin:0;">
        <p style="font-size:0.82em; margin:0; line-height:1.5; opacity:0.85;">
          차원 = 의미 해상도.<br>
          모델 교체 시 차원 유지 → DB 마이그레이션 없이 재인덱싱만.
        </p>
      </div>
    </div>

  </div>

  <aside class="notes">
    "수백 개의 숫자 배열"이 텍스트 의미를 담는다는 게 핵심.
    코사인 유사도: 두 벡터의 각도 — 같은 방향이면 1, 반대면 -1.
    BMS에서 1536d를 고정한 이유: 차원 변경 시 기존 DB 벡터와 공간이 달라져 마이그레이션 필요. 계약처럼 고정.
    색인과 질의에 같은 모델·차원을 써야 한다 — 다른 모델로 질문 임베딩하면 검색이 무의미.
  </aside>
</section>

<!-- ⑦ -->
<section data-section="rag" id="rag-search">
  <h2>벡터 검색 — 코사인 유사도 Top-K</h2>

  <div style="display:grid; grid-template-columns:auto 1fr; gap:var(--space-md); margin-top:var(--space-md); align-items:start;">

    <!-- 코사인 SVG -->
    <div class="box" style="padding:var(--space-sm); margin:0; width:210px;">
      <div class="box-title" style="font-size:0.78em; margin-bottom:8px;">코사인 유사도</div>
      <svg viewBox="0 0 180 160" style="width:100%; display:block;">
        <line x1="90" y1="140" x2="90" y2="20" stroke="#555" stroke-width="1"/>
        <line x1="10" y1="140" x2="170" y2="140" stroke="#555" stroke-width="1"/>
        <!-- 질문 벡터 -->
        <line x1="90" y1="140" x2="150" y2="40" stroke="#f0b429" stroke-width="2" marker-end="url(#arr1)"/>
        <text x="155" y="38" font-size="10" fill="#f0b429">질문</text>
        <!-- 유사 벡터 -->
        <line x1="90" y1="140" x2="140" y2="50" stroke="#5dd5c4" stroke-width="2" marker-end="url(#arr2)"/>
        <text x="145" y="50" font-size="10" fill="#5dd5c4">청크A</text>
        <!-- 비유사 벡터 -->
        <line x1="90" y1="140" x2="30" y2="60" stroke="#a05060" stroke-width="2"/>
        <text x="10" y="58" font-size="10" fill="#a05060">청크B</text>
        <!-- 각도 호 -->
        <path d="M 113,116 A 28,28 0 0,0 121,104" fill="none" stroke="#5dd5c4" stroke-width="1.5"/>
        <text x="118" y="120" font-size="9" fill="#5dd5c4">θ≈11°</text>
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#f0b429"/>
          </marker>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#5dd5c4"/>
          </marker>
        </defs>
      </svg>
      <p style="font-size:0.7em; opacity:0.6; margin:4px 0 0; text-align:center;">θ 작을수록 유사</p>
    </div>

    <!-- BMS Top-5 유사도 표 -->
    <div>
      <div class="box-title" style="margin-bottom:var(--space-xs);">BMS 실제 검색 결과 — "냉매가 새는 것 같아요"</div>
      <table style="width:100%; font-size:0.8em; border-collapse:collapse;">
        <thead>
          <tr style="opacity:0.6; font-size:0.88em;">
            <th style="text-align:center; padding:5px 8px; width:40px;">#</th>
            <th style="text-align:left; padding:5px 8px;">문서 / 섹션</th>
            <th style="text-align:right; padding:5px 8px; width:90px;">유사도</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:color-mix(in srgb, var(--accent-primary) 8%, transparent);">
            <td style="text-align:center; padding:6px 8px; font-weight:700;">1</td>
            <td style="padding:6px 8px;">P-1001 / 증상</td>
            <td style="text-align:right; padding:6px 8px; font-weight:700; color:var(--accent-primary);">0.391</td>
          </tr>
          <tr>
            <td style="text-align:center; padding:6px 8px;">2</td>
            <td style="padding:6px 8px;">E-3002 / 가능한 원인</td>
            <td style="text-align:right; padding:6px 8px;">0.370</td>
          </tr>
          <tr>
            <td style="text-align:center; padding:6px 8px;">3</td>
            <td style="padding:6px 8px;">M-2001 / 정기 점검 항목</td>
            <td style="text-align:right; padding:6px 8px;">0.367</td>
          </tr>
          <tr>
            <td style="text-align:center; padding:6px 8px;">4</td>
            <td style="padding:6px 8px;">E-3002 / 즉각 조치</td>
            <td style="text-align:right; padding:6px 8px;">0.357</td>
          </tr>
          <tr>
            <td style="text-align:center; padding:6px 8px;">5</td>
            <td style="padding:6px 8px;">P-1001 / 비고</td>
            <td style="text-align:right; padding:6px 8px;">0.354</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    질문은 "냉매가 새는"인데 1위가 <strong>P-1001(필터)</strong> — 키워드가 아니라 <strong>의미(이상 증상 맥락)</strong>로 찾기 때문. strict threshold 0.34 전부 통과 → E-3002도 포함.
  </p>

  <aside class="notes">
    키워드 검색이었다면 "냉매"라는 단어가 있는 E-3002가 1위여야 함.
    임베딩은 "필터 막힘"과 "냉매 누출"이 모두 "HVAC 이상 증상" 맥락에서 가깝다고 판단.
    P-1001이 1위지만 Top-5 안에 E-3002가 두 개 들어와 LLM이 근거로 쓸 수 있음 → 다음 슬라이드.
    threshold: strict 0.34 미만은 버림(근거 없음), widen 0.30은 후보 부족 시 재검색.
  </aside>
</section>

<!-- ⑧ -->
<section data-section="rag" id="rag-generate">
  <h2>프롬프트 조립 + 생성 · 인용</h2>

  <div style="display:flex; flex-direction:column; gap:var(--space-md); margin-top:var(--space-md);">

    <!-- 프롬프트 골격 코드블록 (전체 폭) -->
    <div>
      <div class="box-title" style="margin-bottom:var(--space-xs);">프롬프트 골격 (노드4 조립)</div>
      <pre style="width:100%; margin:0;"><code class="language-json" data-trim style="font-size:0.7em; line-height:1.5; text-align:left; white-space:pre-wrap; word-break:break-word;">{
  "messages": [
    {
      "role": "system",
      "content": "주어진 청크만 근거로 답변하라."
    },
    {
      "role": "user",
      "content": "질문: 냉매가 새는 것 같아요\n\n[chunk_id=0] P-1001/증상: ...\n[chunk_id=1] E-3002/가능한 원인: ...\n[chunk_id=2] M-2001/정기 점검 항목: ...\n[chunk_id=3] E-3002/즉각 조치: ...\n[chunk_id=4] P-1001/비고: ..."
    }
  ],
  "model": "gpt-4o",
  "temperature": 0
}</code></pre>
    </div>

    <!-- BMS 결과 (코드 아래 3열) -->
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:var(--space-sm); align-items:stretch;">
      <div class="box" style="padding:14px 20px; margin:0; border-left-color:var(--accent-secondary);">
        <div class="box-title" style="color:var(--accent-secondary);">LLM 선택 (BMS)</div>
        <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.5;">
          검색 1위 P-1001(필터)이 아니라
          <strong>E-3002(냉매) 청크를 근거로 선택</strong>.
          질문 맥락에 맞는 문서를 LLM이 판단.
        </p>
      </div>
      <div class="box" style="padding:14px 20px; margin:0;">
        <div class="box-title">답변 구조</div>
        <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.6;">
          원인 3개 (배관/플레어 누출 [chunk_id=1]
          · 냉매 충전량 부족 [chunk_id=1]
          · 증발기 코일 동결 [chunk_id=3])
          + 점검 3개, 각 주장에 chunk_id 인용
        </p>
      </div>
      <div class="box" style="padding:14px 20px; margin:0; background:var(--bg-tertiary);">
        <div class="box-title" style="opacity:0;">.</div>
        <p style="font-size:0.8em; margin:var(--space-xs) 0 0; line-height:1.5; opacity:0.85;">
          chunk_id 인용 = 환각 억제 + 출처 추적의 핵심.
          "어느 문서에 근거?" 를 답변에서 직접 확인 가능.
        </p>
      </div>
    </div>

  </div>

  <aside class="notes">
    프롬프트 조립의 포인트: chunk_id로 청크에 번호를 붙이면 LLM이 어느 청크를 근거로 했는지 인용 가능.
    LLM이 검색 1위(P-1001)가 아닌 E-3002를 선택한 것은 의미 있는 동작 — 검색 랭킹 ≠ 질문 적합도.
    temperature=0: 결정론적 답변. RAG는 창의성보다 정확성이 우선.
  </aside>
</section>

<!-- ⑨ -->
<section data-section="rag" id="rag-viz">
  <h2>5노드 가시화 — RAG를 블랙박스로 두지 않는다</h2>

  <div style="display:flex; align-items:stretch; justify-content:center; gap:0; margin-top:var(--space-lg);">

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:28px 20px; text-align:center; font-size:0.92em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary); font-size:1.05em;">Webhook</div>
      <div style="opacity:0.85;">질문 수신</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:0 8px; text-align:center;">
      <div style="font-size:1.6em; color:var(--accent-primary); line-height:1;">→</div>
      <div style="font-size:0.76em; opacity:0.65; word-break:keep-all;">질문 텍스트</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:28px 20px; text-align:center; font-size:0.92em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary); font-size:1.05em;">HTTP 임베딩</div>
      <div style="opacity:0.85;">OpenAI API</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:0 8px; text-align:center;">
      <div style="font-size:1.6em; color:var(--accent-primary); line-height:1;">→</div>
      <div style="font-size:0.76em; opacity:0.65; word-break:keep-all;">1536개 벡터</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-secondary); border-radius:8px; padding:28px 20px; text-align:center; font-size:0.92em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-secondary); font-size:1.05em;">HTTP 검색</div>
      <div style="opacity:0.85;">match_documents</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:0 8px; text-align:center;">
      <div style="font-size:1.6em; color:var(--accent-primary); line-height:1;">→</div>
      <div style="font-size:0.76em; opacity:0.65; word-break:keep-all;">유사도 Top-5</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:28px 20px; text-align:center; font-size:0.92em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary); font-size:1.05em;">Code 조립</div>
      <div style="opacity:0.85;">프롬프트 구성</div>
    </div>

    <div style="flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:0 8px; text-align:center;">
      <div style="font-size:1.6em; color:var(--accent-primary); line-height:1;">→</div>
      <div style="font-size:0.76em; opacity:0.65; word-break:keep-all;">프롬프트 JSON</div>
    </div>

    <div style="flex:1; background:var(--bg-secondary); border:1.5px solid var(--accent-primary); border-radius:8px; padding:28px 20px; text-align:center; font-size:0.92em; line-height:1.75; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-weight:700; color:var(--accent-primary); font-size:1.05em;">HTTP LLM</div>
      <div style="opacity:0.85;">gpt-4o</div>
    </div>

  </div>

  <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:var(--space-sm); margin-top:var(--space-lg);">
    <div class="box" style="padding:16px 18px; margin:0; text-align:center; font-size:0.82em; opacity:0.9;">
      <strong>노드1</strong><br>질문 텍스트
    </div>
    <div class="box" style="padding:16px 18px; margin:0; text-align:center; font-size:0.82em; opacity:0.9;">
      <strong>노드2</strong><br>[-0.054, …] ×1536
    </div>
    <div class="box" style="padding:16px 18px; margin:0; text-align:center; font-size:0.82em; border-left-color:var(--accent-secondary);">
      <strong>노드3</strong><br>유사도 표<br><span style="color:var(--accent-secondary);">0.3704</span>
    </div>
    <div class="box" style="padding:16px 18px; margin:0; text-align:center; font-size:0.82em; opacity:0.9;">
      <strong>노드4</strong><br>프롬프트 JSON
    </div>
    <div class="box" style="padding:16px 18px; margin:0; text-align:center; font-size:0.82em; opacity:0.9;">
      <strong>노드5</strong><br>답변 + 인용
    </div>
  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    Activepieces 캔버스에서 각 노드를 클릭하면 <strong>실제 중간 데이터</strong>가 보인다.<br>
    노드3 유사도 <strong>0.3704</strong> = CLI(rag_answer.py) <strong>0.370</strong> 일치 — 캔버스가 같은 RAG임 실증.
  </p>

  <aside class="notes">
    학습 목적으로 만든 별도 플로우. 실제 봇(FastAPI)은 rag_answer.py 함수 한 번 호출.
    가시화의 가치: 임베딩·검색·LLM 각 단계에서 뭐가 흘러가는지 눈으로 확인 가능.
    노드3의 0.3704와 CLI 0.370이 일치한다는 것 = 이 캔버스가 실제 코드와 "같은 RAG"를 실행하고 있다는 증거.
    가시화에서 의도적으로 제외한 것: threshold gate, 사후 가드 5종 — 학습 단계에서는 happy path만.
  </aside>
</section>

<!-- ⑩ -->
<section data-section="rag" id="rag-safety">
  <h2>RAG의 안전장치</h2>

  <p class="lead" style="margin-top:var(--space-sm);">
    검색됐다고 다 믿지 않는다.
  </p>

  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-top:var(--space-md);">

    <div class="box" style="padding:18px 20px; margin:0; border-left-color:var(--accent-primary);">
      <div class="box-title">① threshold gate</div>
      <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.55;">
        strict <strong>0.34</strong> → widen <strong>0.30</strong><br>
        그래도 없으면 → <strong>근거없음</strong> 반환.<br>
        <span style="opacity:0.65; font-size:0.9em;">유사도 낮은 청크는 버린다.</span>
      </p>
    </div>

    <div class="box" style="padding:18px 20px; margin:0; border-left-color:var(--accent-secondary);">
      <div class="box-title" style="color:var(--accent-secondary);">② 사후 가드 5종</div>
      <ul style="font-size:0.78em; margin:var(--space-xs) 0 0; padding-left:1.1em; line-height:1.6;">
        <li>가짜인용 = 0</li>
        <li>인용 100% (청크에 없으면 탈락)</li>
        <li><strong>제어지시 = 0</strong></li>
        <li>원인 후보 ≤ 3</li>
        <li>no_basis 일관성</li>
      </ul>
    </div>

    <div class="box" style="padding:18px 20px; margin:0; border-left-color:var(--accent-danger);">
      <div class="box-title" style="color:var(--accent-danger);">③ 위반 시</div>
      <p style="font-size:0.82em; margin:var(--space-xs) 0 0; line-height:1.55;">
        1회 재생성 시도.<br>
        그래도 위반 → <strong>근거없음</strong>으로 교체.<br>
        <span style="opacity:0.65; font-size:0.9em;">답변이 나오지 않는 게 잘못된 답보다 낫다.</span>
      </p>
    </div>

  </div>

  <p class="callout" style="margin-top:var(--space-md);">
    [BMS] 가시화 플로우는 happy path만(가드 미포함). 실제 봇에서 가드가 2차 방어.<br>
    예: <strong>"압축기를 멈추세요"</strong> 같은 제어 지시 차단(제어지시0 = 0건 확인).
  </p>

  <small class="source">— BMS POC answer_eval.py: 가드 불변식 12/12 PASS (control_bait 3건 전원 차단)</small>

  <aside class="notes">
    RAG 신뢰성은 검색 품질이 아니라 "안 믿는 장치"에서 온다는 게 핵심 메시지.
    데모(가시화)와 프로덕션(실제 봇)의 차이: 데모는 happy path, 프로덕션은 가드가 붙음.
    제어지시0의 의미: "압축기를 멈추세요"처럼 설비 제어를 직접 지시하는 답변은 차단. RAG는 진단만, 조작은 사람이.
    answer_eval 12케이스: grounded 6 + no_basis 3(환각0) + control_bait 3(제어지시0) — 가드 회귀 테스트.
  </aside>
</section>
