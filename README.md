# 0jin.app

0jin.app 메인 페이지. Astro 정적 사이트입니다.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 타입 검사(astro check) + 정적 빌드 → dist/
```

Cloudflare Pages가 push마다 빌드합니다(`npm run build` → `dist`, Node는 `.nvmrc`).
Cloudflare 빌드 환경은 npm 10이라, npm 11로 만든 `package-lock.json`은 `npm ci`에서 실패할 수 있습니다.
의존성을 바꿀 때는 `npx npm@10.9.2 install`로 lock 파일을 갱신해 주세요.

## 구조

```
src/
  data/
    services.ts   서비스 정의 (이름·설명·상태·링크·색·카드 화면)
    layout.ts     그리드 배치 (행 배열, 순서 = 화면 순서)
    site.ts       이메일·GitHub 등 사이트 공통 정보
  content/projects/<slug>.mdx   서비스 상세 페이지 본문
  content.config.ts             본문 컬렉션 정의
  lib/
    grid.ts       layout.ts 검사 + 카드 위치 계산 (잘못되면 빌드 실패)
    card.ts       status별 링크·메타 줄 규칙 (홈 카드·상세 페이지 공통)
    projects.ts   상세 페이지 순서, 본문 slug 검사
  layouts/BaseLayout.astro   공통 틀(헤더·푸터·글꼴·View Transitions)
  components/
    sections/     Intro · ServiceGrid · Footer (메인 페이지 섹션)
    project/      상세 페이지 구성 (Hero · Body · Pager)
    ServiceCard.astro    홈 카드
    ServiceCover.astro   커버(색 + 화면). 홈 카드와 상세 페이지가 같이 씀
    screens/      서비스별 목업 화면 + 등록부(index.ts)
  pages/
    index.astro
    projects/[slug].astro   서비스 상세 페이지 (/projects/<slug>/)
public/_redirects   /projects → / (301)
```

새 섹션은 `src/components/sections/`에 만들고 `src/pages/index.astro`에 끼우면 됩니다.

## 상세 페이지 본문 추가·수정

홈 카드를 누르면 `/projects/<slug>/` 상세 페이지로 갑니다. 상세 페이지는 `services.ts`의 모든 서비스에 자동으로 생기고, 커버·제목·설명·메타 줄·링크 버튼은 `services.ts`에서 가져옵니다.

- 본문은 `src/content/projects/<slug>.mdx`에 씁니다. 파일 이름이 `services.ts`의 `slug`와 같아야 합니다.
- 파일이 없으면 본문 없이 기본 화면만 나옵니다.
- `services.ts`에 없는 slug로 파일을 만들면 `npm run build`가 실패합니다.
- frontmatter는 쓰지 않습니다. 제목과 설명은 `services.ts`가 정본입니다.
- 기본 구성은 `## 만든 이유` / `## 구조` / `## 기술 스택` / `## 어려웠던 점`이고, 섹션은 자유롭게 바꿔도 됩니다. 문체는 짧은 평서문(~했다/~다)입니다.
- MDX라서 본문에 `{`, `<`를 그대로 쓰면 코드로 해석됩니다. 백틱(`` ` ``)으로 감싸 주세요.
- 이전/다음 링크 순서는 `layout.ts`를 따릅니다.

## 서비스 순서 바꾸기

`src/data/layout.ts`에서 행 또는 칸의 순서를 바꿉니다. 배열 순서가 그대로 화면 순서이고, 모바일에서는 위에서 아래로 한 줄씩 쌓입니다.

## 칸 배치 바꾸기

`src/data/layout.ts`의 각 행은 3칸이고, 칸마다 `span`(1·2·3)을 정합니다.

```ts
[{ slug: 'tell-you-later', span: 3 }]                                      // 한 칸 전체
[{ slug: 'quiz', span: 1 }, { slug: 'home-tender', span: 2 }]              // [1, 2]
[{ slug: 'a', span: 1 }, { slug: 'b', span: 1 }, { slug: 'c', span: 1 }]   // [1, 1, 1]
```

- span 합이 3보다 작으면 왼쪽부터 채우고 남는 칸은 비워 둡니다.
- span 합이 3을 넘거나 `services.ts`에 없는 slug를 쓰면 `npm run build`가 실패합니다.

## 서비스 추가·상태 바꾸기

- 서비스 추가: `services.ts`에 항목을 넣고 `layout.ts`에 slug를 배치합니다. 필요하면 `src/content/projects/<slug>.mdx`로 본문을 씁니다.
- `status`는 `live`(주소 표시) · `wip`(“만드는 중” 표시, GitHub 링크) · `archived`(흑백, GitHub 링크) 중 하나입니다. 주소는 `links`에 그대로 두고, 출시하면 `status`만 바꿉니다.
- 카드 화면(`screen`)은 목업(`{ type: 'mockup', name }`, `src/components/screens/index.ts`에 등록) 또는 스크린샷(`{ type: 'image', src, alt }`) 중 하나를 씁니다. `src`는 `src/assets`에서 import한 이미지나 `public/` 기준 경로입니다.
