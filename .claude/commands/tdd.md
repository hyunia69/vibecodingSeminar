---
description: Superpowers TDD로 기능 구현 — 한 줄 명령으로 Red→정지→Green 자동 진행
allowed-tools: Read, Write, Edit, Bash, Skill
---

# /tdd

다음 기능을 **superpowers:test-driven-development** skill을 사용해 엄격한 TDD로 구현한다.

## 기능

$ARGUMENTS

## 진행 절차 (반드시 단계 분리)

### 1단계 — Red

1. `Skill` 도구로 `superpowers:test-driven-development`를 호출해 skill 본문을 로드한다.
2. 해당 모듈의 `.test` 파일에 **실패 테스트만** 추가한다 (없으면 새로 만든다).
3. 모듈 로드가 SyntaxError로 깨지지 않도록 **빈 export stub만** 원본 파일에 추가하는 것은 허용한다 — 단 실제 로직은 절대 작성하지 말 것.
4. 테스트 실행 (`node --test <test-file>` 또는 프로젝트 표준 명령).
5. **실패 로그를 출력에 그대로 첨부**한다. 약한 Red(모듈 not-found만)면 stub 추가 후 재실행해서 assertion 단위의 강한 Red를 확보한다.
6. **여기서 정지한다**. 사용자가 "계속"이라고 명시적으로 말할 때까지 다음 단계로 넘어가지 말 것.

### 2단계 — Green (사용자 "계속" 입력 후)

1. 최소한의 구현을 원본 파일에 작성한다 (YAGNI).
2. 같은 테스트 명령을 다시 실행한다.
3. **통과 로그를 출력에 그대로 첨부**한다. 기존 테스트의 회귀가 없는지도 함께 확인한다.

## 검증 규칙 (`superpowers:verification-before-completion`)

- "통과했다", "구현했다" 같은 주장 금지 — 실제 명령 출력만 증거로 인정.
- 두 단계를 한 turn에 묶지 말 것 — TDD의 본질은 시간 분리.
- 테스트가 첫 시도에 통과하면 Red가 약했다는 신호 — stub을 더 비우거나 테스트를 더 엄격히 한 뒤 재실행.

## 파일 위치 컨벤션

- 테스트 파일은 원본 옆에 `<name>.test.<ext>` 형식 (Jest/Vitest 스타일).
- 별도 지정이 없으면 이 컨벤션을 따른다.
