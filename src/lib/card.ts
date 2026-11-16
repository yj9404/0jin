import type { Service, ServiceLink } from '../data/services';

export type CardLink = { href: string; label: string };

export type CardView = {
  /** 카드 전체가 가는 곳. 없으면 링크 없는 카드 */
  href?: string;
  /** 메타 줄 앞부분(텍스트) */
  meta: string[];
  /** 메타 줄 뒤에 붙는 링크. status가 live일 때만 */
  metaLinks: CardLink[];
};

const STATUS_TEXT = { wip: '만드는 중', archived: '운영 종료' } as const;

export function linkLabel(link: ServiceLink): string {
  if (link.label) return link.label;
  if (link.kind === 'toss') return '토스에서 열기';
  if (link.kind === 'github') return 'GitHub';
  return new URL(link.href).host;
}

/** status에 따라 카드의 링크와 메타 줄을 정한다. 주소를 보여 줄지는 오직 여기서 결정한다. */
export function cardView(service: Service): CardView {
  const github = service.links.find((l) => l.kind === 'github');
  const serviceLinks = service.links.filter((l) => l.kind !== 'github');

  switch (service.status) {
    case 'live':
      return {
        href: serviceLinks[0]?.href ?? github?.href,
        meta: [service.category, service.since],
        metaLinks: serviceLinks.map((l) => ({ href: l.href, label: linkLabel(l) })),
      };
    case 'wip':
      return {
        href: github?.href,
        meta: [service.category, STATUS_TEXT.wip],
        metaLinks: [],
      };
    case 'archived':
      return {
        href: github?.href,
        meta: [
          service.category,
          service.until ? `${service.since} – ${service.until}` : service.since,
          STATUS_TEXT.archived,
        ],
        metaLinks: [],
      };
  }
}

/** 배경 밝기에 맞는 글자색. WCAG 상대 휘도 기준 */
export function inkFor(hex: string): string {
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? '#111111' : '#FFFFFF';
}
