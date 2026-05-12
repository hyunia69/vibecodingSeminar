# 바이브코딩 세미나 슬라이드

> 이 프로젝트 자체가 세미나의 메타 데모다. Claude Code로 만들어 Claude Code로 발전시킨다.

## 빠른 시작

```bash
# 1) 프로젝트 디렉터리에서 정적 서버 실행
python3 -m http.server 8000
# 또는
npx serve .

# 2) 브라우저에서 열기
open http://localhost:8000
```

## 키보드 단축키

| 키 | 기능 |
|----|------|
| `→ ↓ Space` | 다음 슬라이드 |
| `← ↑` | 이전 슬라이드 |
| `Esc` | 슬라이드 개요 |
| `S` | 발표자 노트 (별도 창) |
| `B` 또는 `.` | 화면 검정 |
| `F` | 풀스크린 |
| `Shift+T` | 테마 순환 (dark → light → midnight) |

## 프로젝트 구조

```
vibe-coding-seminar/
├── CLAUDE.md              ← 프로젝트 헌법 (가장 중요)
├── AGENTS.md              ← 서브에이전트 공통 규칙
├── README.md              ← 이 파일
├── index.html             ← 메인 진입점
├── slides/                ← 슬라이드별 마크다운/HTML
│   ├── 00-title.md
│   ├── 01-XX-*.md         ← 1막 (작성 완료: 7장)
│   ├── 02-XX-*.md         ← 2막 (핵심 슬라이드 작성됨, 일부 placeholder)
│   ├── 03-XX-*.md         ← 3막 (placeholder)
│   └── 99-XX-*.md         ← 에필로그 (placeholder)
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── theme-dark.css
│   │   ├── theme-light.css
│   │   └── theme-midnight.css
│   └── js/
│       ├── theme-switcher.js
│       └── visualizations.js  ← 컨텍스트 윈도우, 단일 vs 멀티 시각화
└── docs/
    ├── outline.md         ← 전체 흐름 (단일 진실 원천)
    ├── references.md      ← 인용 출처
    └── speaker-notes.md   ← 발표자 노트
```

## Claude Code로 이어가기

### 1단계: Claude Code 실행

```bash
cd vibe-coding-seminar
claude
```

처음 실행하면 `CLAUDE.md`를 자동으로 읽는다. 이 파일에 모든 규칙이 들어있다.

### 2단계: Placeholder 슬라이드 채우기

각 placeholder 슬라이드는 다음 명령으로 채울 수 있다:

```
slides/03-01-tool-landscape.md를 outline.md의 3-1 섹션 내용으로 채워줘.
디자인은 CLAUDE.md, 인용은 references.md를 따라라.
표 형식으로 도구 비교 + 한 줄 시사점.
```

또는 일괄로:

```
slides/03-*.md 안의 placeholder 슬라이드들을 모두 채워줘.
outline.md의 3막 섹션 따라서, 각각 독립 작업으로 진행해라.
```

### 3단계: 서브에이전트로 병렬 작성

세미나 주제 자체가 서브에이전트라면, 만드는 것도 그렇게:

```bash
# Terminal 1
claude -w "slides/03-01부터 03-04까지 채우기"

# Terminal 2 동시에
claude -w "slides/03-05부터 03-08까지 채우기"

# Terminal 3 동시에
claude -w "slides/99-01부터 99-04까지 채우기"
```

세 worktree에서 동시에 작업, 끝나면 main으로 머지. 이 자체가 세미나의 마지막 데모가 될 수 있다.

### 4단계: 발표 직전 점검

```
모든 슬라이드를 읽고:
1) CLAUDE.md 디자인 원칙을 따르는지
2) 출처가 references.md에 있는지
3) 16:9에서 깨지지 않는지
4) 텍스트가 화면 절반 이하인지
체크해서 보고서로 만들어줘.
```

## 작성 완료된 슬라이드

✅ **1막 (전부 작성 완료)** — 7장
- `01-01` Karpathy 트윗
- `01-02` 1년의 진화 타임라인
- `01-03` "agentic engineering" 개명
- `01-04` Claude Opus 4.7
- `01-05` 함정 통계
- `01-06` Replit 사건 (강조)
- `01-07` 우리의 위치와 약속

✅ **2막 핵심 슬라이드** — 7장
- `02-01` Harness 어원
- `02-02` 하니스 정의 (3단계)
- `02-03` 7개 구성 요소
- `02-04` Thin Harness, Fat Skills
- `02-05` 3단 엔지니어링
- `02-11` 왜 멀티 에이전트
- `02-12` git worktree 메커니즘
- `02-13` 오케스트레이터 패턴
- `02-14` 라이브 데모 안내

📝 **Placeholder (Claude Code로 채울 부분)** — 약 20장
- 2막 일부 (`02-06`, `02-07`, `02-08`, `02-09`, `02-10`, `02-15`)
- 3막 전체 (`03-01` ~ `03-10`)
- 에필로그 전체 (`99-01` ~ `99-04`)

## 데모 준비물

세 번의 데모 시연을 위한 사전 준비:

### 데모 ① Claude Code 기본 (2-8 슬라이드)
- 작은 샘플 프로젝트 (git init된 상태)
- 사전에 `claude /init`으로 CLAUDE.md 한 번 만들어 두기
- 시연 시 `/context`, `/tokens` 명령으로 사용량 보여주기

### 데모 ② Notion MCP (3-5 슬라이드)
- Notion 워크스페이스 + 테스트용 페이지
- Notion MCP 사전 설치
- 시연 흐름: 페이지 읽기 → 분석 → 결과를 다시 푸시

### 데모 ③ Supabase + Vercel 풀스택 (3-10 슬라이드)
- 미리 준비된 디자인 레퍼런스 (Figma 또는 v0 출력)
- Supabase 프로젝트 + Vercel 계정
- "팀 회고 도구" 같은 작은 앱을 5-7분에 만들 수 있도록 사전 리허설

## 빌드/배포

빌드 단계 없음. 정적 호스팅 가능.

```bash
# GitHub Pages 배포 (간단)
git push origin main
# 그 다음 GitHub Settings에서 Pages 활성화

# Vercel 배포
vercel deploy

# 단순 정적 서버
python3 -m http.server 8000
```

## 라이선스

내부 자료. 외부 공유 시 출처(`docs/references.md`) 함께.
