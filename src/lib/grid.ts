import type { LayoutRow } from '../data/layout';
import type { Service } from '../data/services';

export const GRID_COLUMNS = 3;

export type PlacedCard = {
  service: Service;
  span: 1 | 2 | 3;
  /** 1부터 시작하는 그리드 행·열 시작 위치 */
  row: number;
  column: number;
};

/**
 * 레이아웃 정의를 검사하고 카드 배치로 바꾼다.
 * 정적 빌드 중에 호출되므로 여기서 던진 에러는 곧 빌드 실패다.
 */
export function placeCards(layout: LayoutRow[], services: Service[]): PlacedCard[] {
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const errors: string[] = [];
  const placed: PlacedCard[] = [];

  layout.forEach((row, i) => {
    const where = `layout.ts ${i + 1}번째 행`;
    const total = row.reduce((sum, cell) => sum + cell.span, 0);
    if (row.length === 0) errors.push(`${where}: 비어 있습니다.`);
    if (total > GRID_COLUMNS) {
      errors.push(`${where}: span 합이 ${total}입니다. ${GRID_COLUMNS} 이하여야 합니다.`);
    }

    let column = 1;
    for (const cell of row) {
      if (![1, 2, 3].includes(cell.span)) {
        errors.push(`${where}: "${cell.slug}"의 span ${cell.span}은 쓸 수 없습니다. 1, 2, 3 중 하나여야 합니다.`);
      }
      const service = bySlug.get(cell.slug);
      if (!service) {
        errors.push(`${where}: services.ts에 없는 slug "${cell.slug}"입니다.`);
      } else {
        placed.push({ service, span: cell.span, row: i + 1, column });
      }
      column += cell.span;
    }
  });

  if (errors.length > 0) {
    throw new Error(`서비스 그리드 레이아웃이 잘못되었습니다.\n- ${errors.join('\n- ')}`);
  }
  return placed;
}
