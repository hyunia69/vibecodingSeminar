# Demo ③ — GStack + Superpowers 풀 워크플로우

**한 줄 idea → 검증된 정적 HTML/CSS** 까지. 약 25분 라이브.

> 이 데모는 *모든 핵심 skill을 하나의 시연에 녹이는* 것이 목표.
> Office Hours · CEO Review · Eng Review · Design Review · write-plan · TDD · verification.

## 4-단 파이프라인

```
[1] Idea  ──/office-hours──▶  specs/spec.md
[2] Spec  ──/superpowers:writing-plans──▶  plans/plan.md
[3] Plan  ──/autoplan──▶  CEO + Eng + Design + DX 리뷰 → plan.md 갱신
[4] Plan  ──/tdd (Task별)──▶  src/*.html + .css + tests/*.test.mjs
```

각 단계의 *산출물이 다음 단계의 입력*. 청중에게 가장 강력하게 보일 부분.

## 사전 준비 (데모 직전 1회)

```bash
cd demo/landing
npm install            # jsdom (TDD용 DOM 파서)

# 상태 리셋 (이전 시연 잔여물 제거)
rm -rf specs plans reviews src tests
```

`package.json` 만 두고 나머지 디렉터리는 라이브에서 생성되는 모습을 청중에게 보여준다.

## 시연 스크립트

### Stage 1 — Office Hours (~5분)

**발표자 입력**:
```
/office-hours 히어로 + 랜딩 페이지가 있는 홈페이지를 만들고 싶다
```

**모델 행동**: builder mode 진입, 6개 forcing question 던짐:
- 누구를 위한 페이지인가?
- 핵심 가치 제안 한 문장?
- 가장 좁은 wedge?
- 현재 사용자가 이 문제를 어떻게 해결하고 있나?
- 이상적 사용자 행동 1개?
- 6개월 뒤 측정 가능한 성공 지표?

**발표자 응답 예시** (시간 절약용 미리 외워두기):
- 시니어 개발자
- "에이전틱 코딩 90일 로드맵을 한 페이지로"
- 90일 체크리스트 다운로드만
- 흩어진 블로그 글들을 북마크
- 이메일 입력해서 PDF 받아가기
- 100명 다운로드 + 10명 이메일 회신

**산출물**: `demo/landing/specs/spec.md` (모델이 자동 생성)

**발표자 멘트**:
> *"여기서 모델이 한 일 — *idea를 spec으로 변환*. spec.md 파일이 다음 단계의 입력입니다."*

---

### Stage 2 — Writing Plans (~3분)

**발표자 입력**:
```
/superpowers:writing-plans @specs/spec.md
```

**모델 행동**: spec을 읽고 bite-sized task로 분해한 `plans/plan.md` 생성.

**기대 출력 (예시)**:
- Task 1: 페이지 골격 — `<html>`, `<head>`, `<body>`, semantic 섹션
- Task 2: 히어로 섹션 — headline + subhead + CTA
- Task 3: 90일 로드맵 시각화 섹션
- Task 4: 이메일 폼 + 검증
- Task 5: 반응형 CSS + 다크모드

**발표자 멘트**:
> *"plan.md는 각 task가 *독립적으로 테스트 가능*하도록 쪼개진 점이 핵심입니다."*

---

### Stage 3 — Autoplan (~5분)

**발표자 입력**:
```
/autoplan @plans/plan.md
```

**모델 행동**: 4개 리뷰를 순차 실행:
- CEO Review — scope 확장 또는 축소 제안
- Eng Review — 아키텍처·접근성·성능 우려
- Design Review — 시각적·UX 우려
- DX Review — *(랜딩 페이지엔 거의 무관 — 모델이 알아서 짧게 끝냄)*

마지막에 결정 게이트 — 발표자가 *"진행"* 또는 *"수정"* 선택.

**발표자 멘트** (가장 강조할 단계):
> *"4개 리뷰가 한 번에. CEO는 비즈니스 관점, Eng은 아키텍처, Design은 시각, DX는 개발자 경험. 사람 팀이 했다면 4시간 미팅이 5분에 끝납니다."*
> *(결정 게이트에서) "여기서 사람이 한 일은 *yes/no 한 번*입니다. 모든 작업 자체는 자동."*

**산출물**: `plans/plan.md` 가 리뷰 결정에 따라 업데이트됨

---

### Stage 4 — TDD 실행 루프 (~9분, 3 task × 3분)

각 task를 `/tdd` 한 줄로:

```
/tdd plans/plan.md 의 Task 1 (페이지 골격) 구현
```

**기대 흐름** (한 task 기준):
1. Skill 호출 (`superpowers:test-driven-development`)
2. `tests/landing.test.mjs` 에 실패 테스트 추가 (jsdom으로 DOM 파싱)
3. `node --test tests/landing.test.mjs` 실행 → Red 로그
4. 정지 ▶ 발표자 *"계속"* 입력
5. `src/index.html` 에 구현 추가
6. 재실행 → Green 로그

**발표자 멘트** (반복마다):
> *"매 task마다 Red 먼저. 매 task마다 출력으로 증명. discipline은 한 번 박아두면 N번 작동합니다."*

2-3개 task만 라이브로 보여주고, 나머지는 *"같은 흐름으로 N번 더"* 로 압축. 청중 집중력 고려.

---

## 종합 멘트 (데모 끝)

> *"한 줄에서 시작했습니다 — `/office-hours 히어로 페이지를 만들고 싶다`. 25분 뒤 검증된 코드가 나왔습니다. 그 사이의 모든 단계는 *주관*이 아니라 *명령*으로 처리됐고, 모든 결정은 *주장*이 아니라 *출력*으로 증명됐습니다."*
> *"이게 GStack과 Superpowers가 합쳐서 만드는 워크플로우입니다."*

---

## 실패 모드와 대처

| 증상 | 원인 | 즉석 대처 |
|------|------|----------|
| office-hours가 너무 많은 질문 | builder mode 의 6개 forcing question 정상 — 미리 답을 외워둘 것 |
| autoplan이 너무 오래 걸림 | 4개 리뷰 본문 로딩 시간. 첫 1분은 정상 |
| TDD에서 vacuous pass 발생 | 빈 stub에서 통과되는 약한 테스트 — *오히려 교육 기회* (TDD slide의 메시지 회수) |
| 시간 부족 | Task 1만 라이브, 나머지는 *"동일 패턴"* 으로 압축 |

## 리허설 권장

데모 당일 처음 돌리지 말 것. 하루 전 한 번 끝까지 돌려서:
- 각 단계 산출물이 실제로 생성되는지
- autoplan 결정 게이트에서 멈추는지
- TDD가 단계 분리를 지키는지

확인 후 reset 하고 본 시연.

## 파일 구조 (시연 후 최종)

```
demo/landing/
├── README.md             # 이 파일
├── package.json          # jsdom
├── .gitignore
├── specs/
│   └── spec.md           # Stage 1 산출물
├── plans/
│   └── plan.md           # Stage 2, Stage 3 산출물
├── reviews/              # Stage 3 detail (autoplan이 만듦)
├── src/
│   ├── index.html        # Stage 4 산출물
│   └── style.css
└── tests/
    └── landing.test.mjs  # Stage 4 산출물 (TDD)
```
