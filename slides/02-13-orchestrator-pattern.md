<section data-section="act2" id="orchestrator-pattern">
  <h2>오케스트레이터 패턴</h2>

  <div style="text-align: left; max-width: 1200px; margin: var(--space-sm) auto;">

    <p class="lead" style="margin-bottom: var(--space-sm);">
      메인 세션 = <strong>지휘자</strong> · 서브에이전트 = <strong>전문가</strong> · 머지는 <strong>사람의 몫</strong>
    </p>

    <pre style="font-size: 0.65em; line-height: 1.4;"><code class="language-markdown" data-trim>
# CLAUDE.md — 오케스트레이터 규칙

## 작업 분해
1. **Planner** — 명세 + 의존성 식별
2. **Implementer** (병렬) — 각자 worktree에서 구현
3. **Reviewer** — 통합 검토, 일관성 확인
4. **메인 세션** — 각 diff 검토 + 머지 순서 결정

## 격리 (중요)
- 파일 영역 겹치면 `isolation: "worktree"` 필수
- 기본값은 격리 없음 → 동시 수정 시 overwrite
- 머지는 자동 아님 — 메인 세션이 직접 결정
</code></pre>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-sm);">
      <div class="box">
        <div class="box-title">메인 세션이 하는 일</div>
        <ul style="font-size: 0.85em; line-height: 1.45;">
          <li>작업 분해 + 격리 전략 결정</li>
          <li>서브에이전트에게 위임</li>
          <li><strong>diff 검토 · 머지 순서 결정</strong></li>
          <li>결과 합성 → 사용자 보고</li>
        </ul>
      </div>
      <div class="box" style="border-left-color: var(--accent-secondary);">
        <div class="box-title" style="color: var(--accent-secondary);">서브에이전트가 하는 일</div>
        <ul style="font-size: 0.85em; line-height: 1.45;">
          <li>주어진 단일 작업 집중</li>
          <li>자기 worktree만 만짐</li>
          <li>완료 시 요약 + diff 반환</li>
          <li>긴 컨텍스트 메인에 안 넘김</li>
        </ul>
      </div>
    </div>

    <div class="box" style="margin-top: var(--space-sm); padding: 12px 22px; border-left-color: var(--accent-primary);">
      <div class="box-title">에이전트는 어떻게 정의하나 — <span class="kw">/agents</span> 슬래시 명령</div>
      <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: var(--space-sm); align-items: start; margin-top: 6px;">
        <ul style="font-size: 0.82em; line-height: 1.5; margin: 0;">
          <li>Claude Code 내장 — 인터랙티브 UI로 생성·편집·삭제</li>
          <li>저장 위치: <span class="kw">.claude/agents/&lt;name&gt;.md</span> (팀) · <span class="kw">~/.claude/agents/</span> (개인)</li>
          <li>스킬 아님 — <strong>네이티브 명령</strong>. 만들고 나면 <span class="kw">Agent</span> tool로 호출</li>
        </ul>
<pre style="font-size: 0.65em; margin: 0;"><code class="language-markdown" data-trim>
---
name: code-reviewer
description: PR diff를 SQL 안전성·구조적 이슈 관점으로 리뷰
tools: [Read, Grep, Glob, Bash]
model: opus
---
You are an expert code reviewer. Focus on...
</code></pre>
      </div>
    </div>

  </div>

  <aside class="notes">
    이 패턴이 "thinking partner + execution workers" 구조를 만든다.

    슬라이드의 두 가지 강조점:
    1. 격리는 opt-in이다 — CLAUDE.md에 규칙으로 박아두지 않으면 매번 같은 디렉터리에서 race가 난다.
    2. 머지는 자동이 아니다 — 메인 세션의 핵심 책임이 "diff 검토 + 머지 순서 결정"이다. worktree는 격리만 제공.

    부수 효과: 서브에이전트는 자기 작업만 압축 요약해서 메인에 반환. 이래야 메인 세션의 컨텍스트 윈도우가 폭발하지 않는다.

    예상 질문: "그러면 머지 충돌 나면 누가 풀어?" → 메인 에이전트가 보통 풀지만, 복잡하면 사람이 개입. worktree는 충돌을 막아주는 게 아니라 "병렬 작업 동안 격리"만 보장.

    /agents 박스 멘트: "그런데 이 서브에이전트들은 어디서 오나?" — 자연스러운 질문 받기 좋음. Claude Code의 /agents 명령이 정답. 스킬과 헷갈리기 쉬운데, 스킬은 행동 절차이고 에이전트는 별도 컨텍스트 윈도우를 가진 독립 실행 단위. frontmatter의 tools 필드로 권한 좁히기 → 보안 베스트 프랙티스. 모델 필드로 비싼 작업은 Opus, 단순 grep은 Haiku 등 비용 최적화도.
  </aside>
</section>
