import type { Service, ServiceLink } from '../data/services';

export type CardLink = { kind: ServiceLink['kind']; href: string; label: string };

const STATUS_TEXT = { wip: '만드는 중', archived: '운영 종료' } as const;
const KIND_ORDER: ServiceLink['kind'][] = ['site', 'toss', 'github'];

/** 서비스 상세 페이지 경로 */
export function projectPath(slug: string): string {
  return `/projects/${slug}/`;
}

export function linkLabel(link: ServiceLink): string {
  if (link.label) return link.label;
  if (link.kind === 'toss') return '토스에서 열기';
  if (link.kind === 'github') return 'GitHub';
  return new URL(link.href).host;
}

/** "2026.03 – 2026.08". until이 없으면 since만 */
export function periodText(service: Service): string {
  return service.until ? `${service.since} – ${service.until}` : service.since;
}

/**
 * 화면에 보여 줄 외부 링크. 주소를 보여 줄지는 오직 여기서 정한다.
 * live는 전부, wip·archived는 GitHub만. 순서는 site → toss → github.
 */
export function visibleLinks(service: Service): CardLink[] {
  return service.links
    .filter((l) => service.status === 'live' || l.kind === 'github')
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind))
    .map((l) => ({ kind: l.kind, href: l.href, label: linkLabel(l) }));
}

/** 메타 줄의 텍스트 부분. "Web · 2026.11", "Toss Mini App · 만드는 중", "Web · 2026.03 – 2026.08 · 운영 종료" */
export function metaText(service: Service): string[] {
  switch (service.status) {
    case 'live':
      return [service.category, service.since];
    case 'wip':
      return [service.category, STATUS_TEXT.wip];
    case 'archived':
      return [service.category, periodText(service), STATUS_TEXT.archived];
  }
}

/** 홈 카드 메타 줄 뒤에 붙는 서비스 주소. live일 때만 */
export function metaLinks(service: Service): CardLink[] {
  return visibleLinks(service).filter((l) => l.kind !== 'github' && service.status === 'live');
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
