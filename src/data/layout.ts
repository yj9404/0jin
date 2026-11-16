/**
 * 메인 서비스 그리드의 배치. 배열 순서가 곧 화면 순서다(모바일에서는 위에서 아래로 한 줄씩).
 *
 * - 한 행은 3칸. 각 칸은 { slug, span }이고 span은 1·2·3.
 * - 지원 패턴: [3], [1, 2], [2, 1], [1, 1, 1]. 합이 3보다 작은 행은 왼쪽부터 채우고 남는 칸은 비운다.
 * - span 합이 3을 넘거나 services.ts에 없는 slug를 쓰면 빌드가 실패한다(src/lib/grid.ts).
 */
export type LayoutCell = { slug: string; span: 1 | 2 | 3 };
export type LayoutRow = LayoutCell[];

export const layout: LayoutRow[] = [
  [{ slug: 'tell-you-later', span: 3 }],
  [
    { slug: 'fomobot', span: 1 },
    { slug: 'recall-check', span: 1 },
    { slug: 'salary-check', span: 1 },
  ],
  [
    { slug: 'quiz', span: 1 },
    { slug: 'home-tender', span: 2 },
  ],
  [
    { slug: 'two-degrees', span: 1 },
    { slug: 'korean-trip-planner', span: 1 },
  ],
];
