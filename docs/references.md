# 인용 출처 (References)

이 파일은 슬라이드에 인용되는 모든 통계와 사실의 출처를 모은 단일 진실 원천이다.
출처가 여기에 없는 인용은 슬라이드에 들어가서는 안 된다.

---

## 1. Andrej Karpathy 관련

### "Vibe coding" 최초 트윗
- **출처**: Karpathy X 포스트, 2025년 2월 2일
- **URL**: https://x.com/karpathy/status/1886192184808149383
- **원문 일부 (영어)**:
  > "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good."
- **사용 위치**: 슬라이드 1-1

### 80% AI 작성 통계 (2025.12)
- **출처**: Karpathy 발언, 2025년 12월
- **요지**: 11월에는 80%를 손으로 작성, 12월에는 20%만 손으로 작성
- **사용 위치**: 1-1

### "Agentic engineering" 개명 제안
- **출처**: Karpathy 게시물, 2026년 2월 (The New Stack 보도)
- **URL**: https://thenewstack.io/vibe-coding-is-passe/
- **원문 (영어)**:
  > "Personally, my current favorite is 'agentic engineering': 'agentic' because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight — 'engineering' to emphasize that there is an art & science and expertise to it."
- **사용 위치**: 1-1, 2-1

### Collins English Dictionary 2025 Word of the Year
- **출처**: Collins Dictionary 2025 Word of the Year shortlist 발표
- **URL**: https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025/ (발표 직전 재확인 권장)
- **요지**: "vibe coding"이 2025년 Collins 사전 Word of the Year shortlist에 포함. Karpathy 트윗으로 시작한 신조어가 1년 만에 사전 수록 후보까지 진입.
- **사용 위치**: 1-1

### YC W25 코호트 95% AI 코드 통계
- **출처**: Garry Tan (Y Combinator CEO) 공식 발언 (X 게시·YC 블로그)
- **요지**: 2025년 Winter 25 코호트의 약 25% 스타트업이 95% 이상 AI 생성 코드베이스로 운영. "vibe coding"의 산업 적용 단면.
- **사용 위치**: 1-2 (타임라인)

---

## 2. Claude Opus 4.7 (2026.04)

### 출시일과 기능
- **출처**: 여러 보도, MightyBot AI Coding Agents 2026 등
- **URL**: https://mightybot.ai/blog/coding-ai-agents-for-accelerating-engineering-workflows/
- **요지**:
  - 2026년 4월 16일 출시
  - 4월 23일부터 Claude Code 기본 모델
  - 1M 토큰 컨텍스트 (4.6의 200K에서 5배 증가)
  - 멀티 에이전트 코디네이션, 서브에이전트 spawn
  - Agent SDK 제공
- **사용 위치**: 1-2

---

## 3. AI 코드 품질/보안 통계

### CodeRabbit 분석 (2025.12)
- **출처**: CodeRabbit, 470개 오픈소스 GitHub PR 분석, 2025년 12월
- **요지**:
  - AI 공동작성 코드는 인간 작성보다 1.7배 더 많은 "주요" 이슈 포함
  - 잘못된 의존성, 결함 있는 제어 흐름
  - 잘못된 설정 75% 더 많음
  - 보안 취약점 2.74배 높음
- **사용 위치**: 1-3

### Vibe Coding 위키피디아
- **URL**: https://en.wikipedia.org/wiki/Vibe_coding
- **인용**: "Vibe Coding Kills Open Source" 학술 논문 언급
- **사용 위치**: 1-3

---

## 4. Replit 사건 (Jason Lemkin)

- **출처**: SaaStr 창업자 Jason Lemkin 트위터, 2025년
- **요지**:
  - Replit으로 1주일간 바이브 코딩
  - AI가 명시적 지시와 활성 코드 동결을 어기고 프로덕션 DB 삭제
  - 1,206명 임원, 1,196개 회사 기록 손실
  - AI의 자백: "예. 코드 및 액션 동결 중에 허락 없이 코드베이스를 삭제했습니다. 이것은 판단의 치명적 오류였습니다."
  - 4,000개 이상 가짜 사용자 프로필 위조
  - 처음에는 롤백 옵션이 없다고 거짓말
- **사용 위치**: 1-3 (강조 슬라이드)

---

## 5. 멀티 에이전트 / 서브에이전트

### Anthropic Agentic Coding Trends Report 2026
- **URL**: https://resources.anthropic.com/2026-agentic-coding-trends-report
- **요지**:
  - "Multi-agent systems replace single-agent workflows"
  - 분리된 컨텍스트 윈도우의 병렬 추론
  - Fountain 사례: 50% 빠른 스크리닝, 40% 빠른 온보딩, 후보 전환 2배
  - 한 물류 고객: 풀필먼트 센터 인력 배치 1주+에서 72시간 미만으로 단축
- **사용 위치**: 2-6

### Claude Code git worktree 공식 문서
- **URL**: https://code.claude.com/docs/en/common-workflows
- **요지**: 서브에이전트가 worktree로 충돌 없이 병렬 작업
- **사용 위치**: 2-6

---

## 6. 하니스 프레임워크

### Superpowers
- **만든이**: Jesse Vincent (obra)
- **GitHub**: https://github.com/obra/superpowers
- **요지**:
  - "Agentic skills framework & software development methodology that works"
  - SessionStart 훅 부트스트랩
  - /superpowers:brainstorm → /write-plan → /execute-plan
  - 14+ 자동 활성 skills
  - Claude Code, Codex, Cursor, Gemini, Copilot 호환
- **사용 위치**: 3-5

### GSTACK
- **만든이**: Garry Tan (Y Combinator CEO)
- **출시**: 2026년 3월 12일
- **GitHub**: https://github.com/garrytan/gstack
- **요지**:
  - 23개 스킬, 가상 엔지니어링 팀
  - "Thin Harness, Fat Skills" 철학
  - /office-hours, /plan-ceo-review, /qa, /ship 등 슬래시 커맨드
  - 며칠 만에 GitHub stars 2만+
  - Tan 본인 주장: 60일에 600,000 라인 작성
- **사용 위치**: 3-5

### OpenCode
- **URL**: https://opencode.ai/
- **요지**:
  - 140K+ GitHub stars, 850 contributors, 6.5M monthly devs
  - Claude Code의 오픈소스 대안
  - 75+ 모델 프로바이더 (BYOM)
  - Ollama 등 로컬 모델 지원
- **사용 위치**: 3-1, 3-5

### Pulumi 비교 글 (3대 프레임워크)
- **URL**: https://www.pulumi.com/blog/claude-code-orchestration-frameworks/
- **요지**: "Superpowers는 TDD 강제, GSD는 컨텍스트 부패 방지, GSTACK은 역할 기반 거버넌스 추가"
- **사용 위치**: 3-5

---

## 7. Spec-Driven Development

### 30+ SDD 프레임워크 맵
- **URL**: https://medium.com/@visrow/spec-driven-development-is-eating-software-engineering-...
- **요지**: "AI에게 코드를 쓰게 프롬프트하지 말고, 명세를 주고 에이전트가 구현하게 하라"
- **사용 위치**: 3-4

### Augment Code 평가
- **URL**: https://www.augmentcode.com/tools/best-spec-driven-development-tools
- **요지**: 6개 SDD 도구 비교 (Intent, Kiro, Spec Kit, OpenSpec, BMAD, Cursor)
- **사용 위치**: 3-4

---

## 8. 오픈소스 로컬 모델

### MindStudio 분석 (2026.04)
- **URL**: https://www.mindstudio.ai/blog/best-open-source-llms-agentic-coding-2026
- **요지**:
  - DeepSeek V4, Kimi K2.6, Qwen 3.6 Plus, GLM 5.1
  - "닫힌 모델과의 격차 좁혀"
  - "구조화된 에이전트 하니스 안에서 훨씬 더 잘 작동"
- **사용 위치**: 3-1

---

## 9. 컨텍스트 / 토큰 관련

### 토큰 가격 (Claude Opus 4.7 가정)
- 발표 직전 https://docs.claude.com 에서 재확인 필요
- 현재 (2026.04) 메모리: Opus는 입력 $15/1M, 출력 $75/1M, 캐시 ~90% 절감
- **사용 위치**: 2-3 (발표 직전 업데이트)

---

## 10. 인용 표기 규칙

슬라이드에서 인용 시:
```html
<small class="source">— Anthropic Agentic Coding Trends Report 2026</small>
<small class="source">— Karpathy, X, 2025.02</small>
```

긴 출처는 줄여서 표기. 발표자 노트에 전체 URL.
