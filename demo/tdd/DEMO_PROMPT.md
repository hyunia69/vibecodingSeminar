# Superpowers TDD 라이브 데모 — 프롬프트

## 사용법 (한 줄)

```
/tdd <자연어로 쓴 기능 설명>
```

`/tdd` 슬래시 커맨드가 superpowers TDD skill을 자동 호출하고, Red→정지→Green 흐름을 강제한다.
커맨드 본체는 `.claude/commands/tdd.md` 에 정의되어 있다.

## 세미나용 예시 프롬프트

### 메인 시나리오 — 기능 추가

```
/tdd demo/tdd/src/tokenCost.mjs 에 compareCost(workload) 함수를 추가해줘. 모든 모델에 estimateCost를 적용해서 [{model, cost}, ...]를 cost 오름차순으로 반환.
```

이 한 줄을 Claude Code에 붙여넣으면:

1. `superpowers:test-driven-development` skill 자동 호출
2. `tokenCost.test.mjs` 에 실패 테스트 추가
3. (필요 시) stub export 추가
4. `node --test` 실행 → **Red 로그 첨부**
5. 정지

사용자가 "계속" 입력하면 Green 단계 진행.

### 대체 시나리오 — 버그 수정

```
/tdd demo/tdd/src/tokenCost.mjs 의 estimateCost 가 inputTokens 에 문자열을 받으면 NaN 을 조용히 반환한다. 입력 타입 검증 추가해서 고쳐줘.
```

회귀 테스트 컨셉을 함께 보일 수 있다.

### 가장 짧은 형태

특정 파일 지정 없이도 동작 — Claude가 컨텍스트에서 추론한다.

```
/tdd compareCost 함수 추가 — 모든 모델 비용 비교, 오름차순 정렬
```

---

## 발표자 진행 노트

### 데모 전 한 문장 셋업
> "기존 tokenCost 모듈에 *모델별 비용 비교* 함수를 추가합니다. 슬래시 커맨드 하나만 칩니다 — `/tdd`. 어떤 순서로 일이 일어나는지 보세요."

### Red 단계 (자동 진행 중)
- Skill 호출 줄이 보이면 가리키며: *"보세요 — 모델이 먼저 test-driven-development skill을 invoke 합니다. 우리가 시킨 게 아니라 커맨드가 강제했습니다."*
- 테스트 파일 diff 가 나타날 때: *"구현은 한 줄도 안 건드렸습니다. 테스트만 추가."*
- 빨간색 fail 출력이 나올 때: *"이게 진짜 Red 입니다. 이 로그가 *증거* 입니다."*

### 일시정지 중 — 청중에게 질문
> "여기서 모델이 구현부터 시작했다면? 테스트와 구현을 같이 짜맞춰서 한 번에 통과시키는 게 가능했을 겁니다. **시간을 분리하는 것 자체가 검증입니다.**"

### "계속" 입력 후 Green 단계
- 구현 diff 나올 때: *"이제 구현이 추가됩니다. 테스트는 안 건드림."*
- Green 출력 나올 때: *"기존 N개 + 새 M개 = 모두 통과. 그리고 그 통과 로그가 다시 다음 작업의 증거가 됩니다."*

### 마무리 한 줄
> "AI가 한 일을 *주장*이 아니라 *출력*으로 보여주는 것 — 이게 `verification-before-completion` 이 강제하는 디시플린입니다."

---

## 커맨드 내부 동작

`/tdd <args>` 실행 시 Claude Code가 `.claude/commands/tdd.md` 를 로드하고 `$ARGUMENTS` 를 사용자 입력으로 치환해 보낸다. 그 결과로 다음이 강제됨:

- `Skill('superpowers:test-driven-development')` 명시적 호출
- Red→정지→Green 단계 분리 (한 turn에 묶기 금지)
- 로그 첨부 (verification-before-completion 규칙)
- 약한 Red(모듈 로드 실패) 시 stub 추가 후 재실행

커맨드를 수정하려면 `.claude/commands/tdd.md` 편집.

---

## 실패 모드와 대처

| 증상 | 가능한 원인 | 즉석 대처 |
|------|-----------|----------|
| 모델이 1+2 단계를 한 번에 묶음 | 커맨드 인스트럭션 약함 | 중간에 ESC, *"1단계만 하고 멈춰"* 재지시 후 커맨드 본체에 강조 추가 |
| Red 가 module-not-found 만 뜸 | stub 누락 | 커맨드는 이미 stub 추가를 허용함 — 다시 시도 |
| 첫 시도에 Green | 모델이 구현부터 했음 | 가장 좋은 교육 기회 — *"보세요, skill 없으면 이렇게 됩니다. 다시 해봅시다."* |
| Skill 호출이 안 보임 | UI 가 축약 표시 중 | 결과의 *순서*가 중요 — UI 디테일은 우회 |

---

## 데모 후 청소

다음 데모에서 같은 시나리오를 다시 보여주려면:

```bash
cd demo/tdd
git checkout src/tokenCost.mjs src/tokenCost.test.mjs
```

또는 추가된 코드를 그대로 두고 *다음 기능* 으로 넘어가도 무방.
