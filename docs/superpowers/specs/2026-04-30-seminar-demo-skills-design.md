# 세미나 데모 Skills — 설계 문서

- **날짜**: 2026-04-30
- **대상 프로젝트**: vibe-coding-seminar
- **저자**: Hyun + Claude Code (Opus 4.7)

## 배경

이 프로젝트는 바이브코딩(에이전틱 엔지니어링) 세미나 슬라이드 자료다. 청중은 시니어 개발자 2명, 형식은 발표자가 데모를 보여주는 1.5–2시간 자리.

세미나의 메타 메시지: **"이 슬라이드 자체가 Claude Code로 만들어진다."**

이 작업은 그 메타 메시지의 일부로, **두 개의 Skill을 만들고 사용하는 과정 자체를 시연**한다. 두 Skill은 다음 두 가지 패턴을 보여주기 위해 선정됨:

- `speaker-notes` — **페르소나/톤을 Skill 본문에 박제하는 패턴**. CLAUDE.md(전역, 항상 로드)와 Skill(특정 작업 시 로드)의 차이를 명확히 보여줌.
- `audience-anticipator` — **AI에게 청중 페르소나 시뮬레이션을 시키는 패턴**. 세미나 핵심 메시지 "컨텍스트가 왕이다"의 구체화.

## 목표

1. 슬라이드 작업 중 자연어로 호출 시 description 매칭으로 자동 트리거
2. 페르소나/톤이 일관되게 적용된 결과물 생성
3. **데모 시 Skill 파일 자체가 짧고 읽기 쉬워야 함** — 청중이 5분 안에 이해
4. 두 Skill의 서로 다른 출력 전략(파일 직접 편집 vs 별도 파일 생성)으로 변형 가능성을 보여줌

## 비-목표

- 다른 프로젝트 재사용 (글로벌 설치 안 함, 프로젝트 로컬에만 둠)
- 대규모 슬라이드 일괄 처리
- expected-questions 파일의 자동 정리/만료 로직
- 발표 중 실시간 사용 (사전 준비용)

## 설계

### Skill 1: `speaker-notes`

**위치**: `.claude/skills/speaker-notes/SKILL.md`

**Frontmatter**:

```yaml
---
name: speaker-notes
description: Use when generating or refining 발표자 노트 (<aside class="notes">) for Reveal.js seminar slides. Triggered by phrases like "발표자 노트", "스피커 노트", "speaker notes", "노트 추가", "notes for this slide".
---
```

**입력**: 슬라이드 파일 경로 (대화 컨텍스트에서 추론, 없으면 사용자에게 묻기)

**동작**:

1. 슬라이드 파일 읽기
2. 슬라이드 본문에서 다루는 핵심 1개 식별
3. 3–5줄 노트 생성:
   - 슬라이드 본문 반복 금지
   - 슬라이드에 없는 맥락 / 발표 타이밍 / 강조 단서
   - 페르소나(시니어 동료에게 말하듯) 반영
4. `<aside class="notes">` 안에 쓰기 — 있으면 교체, 없으면 새로 추가
5. 사용자에게 변경 내용 보여주기

**Skill 본문 구성 (예상 길이 ~50줄)**:

- 페르소나 정의 (3–4줄)
- 노트 작성 원칙 (5–6줄)
- 좋은 예 1개 — `slides/02-08-demo1-claude-code.md`의 기존 노트 인용
- 처리 절차 (4–5단계)

### Skill 2: `audience-anticipator`

**위치**: `.claude/skills/audience-anticipator/SKILL.md`

**Frontmatter**:

```yaml
---
name: audience-anticipator
description: Use when predicting senior developer audience questions for a seminar slide. Triggered by phrases like "예상 질문", "청중 질문", "Q&A 준비", "시니어가 물을 만한", "anticipate questions".
---
```

**입력**: 슬라이드 파일 경로

**동작**:

1. 슬라이드 본문 읽기
2. `docs/outline.md` 읽기 (전체 흐름 파악)
3. 인접 슬라이드 1–2개 읽기 (직전/직후, 연결 질문 예측용)
4. 3개 카테고리에서 질문 생성:
   - **트집 (Skeptical)** — 1–2개. 통계/벤치마크 출처, claim 검증, 정확성 시비
   - **연결 (Cross-slide)** — 1–2개. 다른 슬라이드/주제와 연결되거나 어긋나는 질문
   - **응용 (Practical)** — 1–2개. "우리 팀/내 코드베이스에서는 어떻게?"
5. 각 질문에 1–2줄 답변 힌트 첨부
6. `docs/expected-questions/<slide-id>.md`에 저장 (디렉터리 없으면 생성)
   - `<slide-id>`는 슬라이드 파일명의 basename (예: `slides/02-11-why-multi-agent.md` → `02-11-why-multi-agent.md`)

**Skill 본문 구성 (예상 길이 ~70줄)**:

- 청중 페르소나 (3–4줄)
- 카테고리별 질문 패턴 가이드 (각 2–3줄)
- 좋은 예 1개 — 실제 슬라이드 하나에 대한 예상 질문 묶음
- 처리 절차 (5–6단계)

## 출력 파일 형식 (audience-anticipator)

```markdown
# 예상 질문 — <슬라이드 제목>

- 슬라이드: `slides/02-11-why-multi-agent.md`
- 생성일: 2026-04-30

## 트집

### Q. 멀티 에이전트가 단일보다 빠르다는 벤치마크 출처는?

답변 힌트: ...

## 연결

### Q. 02-06의 컨텍스트 윈도우 한계와 이게 어떻게 연결되나?

답변 힌트: ...

## 응용

### Q. 우리 팀의 모노리포에서 worktree 없이 어떻게 가능한가?

답변 힌트: ...
```

## 최종 디렉터리 구조

```
vibe-coding-seminar/
├── .claude/skills/
│   ├── speaker-notes/SKILL.md
│   └── audience-anticipator/SKILL.md
└── docs/
    └── expected-questions/      # 첫 실행 시 생성
        └── <slide-id>.md
```

## 데모 흐름 (세미나 본 발표에서)

1. 발표자 노트가 비어있는 슬라이드 하나를 띄움
2. "이 슬라이드 발표자 노트 작성해줘" — 자연어 호출
3. Claude Code가 `speaker-notes` skill을 자동 로드 — **description 매칭으로 자동 트리거됨을 청중에게 강조**
4. 결과 diff 보여줌
5. 같은 슬라이드에 "예상 질문도 뽑아줘"
6. `audience-anticipator` skill 자동 로드
7. 새로 생긴 `docs/expected-questions/<id>.md` 열어서 보여줌
8. **두 SKILL.md 파일 자체를 열어서 청중에게 보여줌** — "보세요, 그냥 마크다운입니다"
9. 청중에게 전달할 핵심 3가지:
   - description 매칭으로 자동 로드 (선언적, 명령어가 아님)
   - 페르소나/톤이 코드가 아니라 문서로 박제됨
   - CLAUDE.md(전역, 항상) vs Skill(작업별, 필요할 때)의 분리

## 엣지 케이스

- **슬라이드 파일을 못 찾을 때**: 사용자에게 경로를 묻기
- **이미 노트가 있을 때 (speaker-notes)**: 교체 전 diff 제시 후 사용자 확인
- **`docs/outline.md`가 없을 때 (audience-anticipator)**: outline 없이 진행, 사용자에게 알림
- **첫 실행 시 `docs/expected-questions/` 디렉터리 부재**: 자동 생성
- **인접 슬라이드 판별**: 파일명의 막-순서 prefix(예: `02-11`) 기준으로 직전/직후. 막 경계를 넘는 경우(예: `02-15` → `03-01`)는 건너뛰지 않음
- **같은 슬라이드의 expected-questions 파일이 이미 있을 때**: 덮어쓰기 전 사용자 확인

## 검증

자동 테스트 없음(Skill은 LLM이 해석). 수동 검증:

- 슬라이드 3개(각각 막 1, 2, 3에서 하나씩) 선정해 두 Skill 실행
- 결과의 페르소나/톤 일관성 확인
- 자연어 트리거 변형 5개 시도 (description 매칭 신뢰도 검증)
- 두 Skill을 연속 호출했을 때 컨텍스트 충돌 없는지 확인
