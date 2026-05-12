---
name: audience-anticipator
description: Use when predicting senior developer audience questions for a seminar slide. Triggered by phrases like "예상 질문", "청중 질문", "Q&A 준비", "시니어가 물을 만한", "anticipate questions".
---

# 청중 예상 질문 생성

이 skill은 바이브코딩 세미나의 시니어 청중이 던질 만한 날카로운 질문을 미리 뽑아 `docs/expected-questions/<slide-id>.md`로 저장한다.

## 청중 페르소나

- **시니어 개발자 2명**, 5년 이상 경력
- AI 코딩 도구를 일부 써봤음 — Copilot, ChatGPT, Cursor 정도
- **회의적이지만 호기심 있음** — 마케팅 멘트를 싫어함
- 통계/벤치마크 나오면 출처를 캐물음
- 자신의 코드베이스 / 팀 상황으로 환원해서 묻는 경향

## 질문 카테고리

각 카테고리에서 1–2개씩, 총 3–6개 질문 생성한다.

### 트집 (Skeptical)
- 통계/벤치마크 출처
- claim의 정확성 ("정말 X가 Y보다 빠른가?")
- 일반화 가능성 ("toy 프로젝트에서만 그런 것 아닌가?")

### 연결 (Cross-slide)
- 다른 슬라이드의 주장과 모순되거나 보강하는 지점
- 전체 흐름에서 이 슬라이드의 위치 — 앞/뒤로 무엇이 와야 자연스러운가
- 이전에 보여준 데모/시각화와의 호환

### 응용 (Practical)
- "우리 팀의 모노리포에서는?"
- "regulated industry에서는?"
- "팀에 도입할 때 가장 큰 저항은?"

## 좋은 예 (가상 슬라이드: 02-11 "왜 멀티 에이전트인가")

본문: Fountain 50% 빠른 스크리닝, 물류 72시간, Anthropic 2-4× 추정치.

```markdown
# 예상 질문 — 왜 멀티 에이전트인가

- 슬라이드: `slides/02-11-why-multi-agent.md`
- 생성일: 2026-04-30

## 트집

### Q. Fountain 50%, 물류 72시간 — 작업 복잡도 어느 수준에서 측정한 건가?
답변 힌트: docs/references.md의 Anthropic 2026 보고서 + Fountain 케이스 스터디. 단순 코드 생성에서는 오버헤드가 더 큼. "리포 전체 리팩터링" 같은 다단계 작업에서만 유의미하다.

### Q. "Anthropic 추정치"라고 적은 2-4×는 어떤 가정인가?
답변 힌트: 독립 작업 비율 / worktree 활용 가능성에 따라. 슬라이드 02-12에서 mechanism 설명할 때 상세히 짚는다.

## 연결

### Q. 02-06에서 "context window가 폭발한다"고 했는데, 멀티 에이전트는 그 한계를 어떻게 회피하나?
답변 힌트: 각 subagent가 독립 컨텍스트. orchestrator는 결과만 합침. → 02-13의 orchestrator pattern 슬라이드와 직접 연결.

## 응용

### Q. monorepo + Bazel 같은 환경에서 worktree가 동작하나?
답변 힌트: git worktree 자체는 동작. 단 빌드 시스템이 absolute path 가정하면 깨질 수 있음. 데모 ③에서 한 번 더 짚을 예정.
```

## 처리 절차

1. 슬라이드 파일 경로 확인. 없으면 사용자에게 묻기.
2. 슬라이드 파일 Read. 핵심 claim, 통계, 인용을 식별.
3. `docs/outline.md` Read. 전체 흐름 파악.
4. 인접 슬라이드 1–2개 Read. 파일명 prefix(예: `02-11`) 기준 직전/직후. 막 경계 넘는 경우(예: `02-15` → `03-01`) 건너뛰지 않는다.
5. 카테고리별로 질문 생성 — 위 좋은 예 형식 그대로.
6. `docs/expected-questions/` 디렉터리 확인, 없으면 생성.
7. `docs/expected-questions/<slide-id>.md`로 저장.
   - `<slide-id>` = 슬라이드 파일명의 basename (예: `slides/02-11-why-multi-agent.md` → `02-11-why-multi-agent.md`)
8. 같은 파일이 이미 있으면 사용자에게 덮어쓰기 확인을 받는다.
