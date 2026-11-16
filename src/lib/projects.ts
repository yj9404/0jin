import { getCollection, type CollectionEntry } from 'astro:content';
import { layout } from '../data/layout';
import { services, type Service } from '../data/services';
import { placeCards } from './grid';

/** 홈 그리드(layout.ts) 순서. layout에 없는 서비스는 services.ts 순서로 뒤에 붙인다. */
export function orderedServices(): Service[] {
  const placed = placeCards(layout, services).map((c) => c.service);
  const rest = services.filter((s) => !placed.includes(s));
  return [...placed, ...rest];
}

/** 상세 본문(MDX)을 slug로 찾는다. services.ts에 없는 slug의 파일이 있으면 빌드 에러. */
export async function projectEntries(): Promise<Map<string, CollectionEntry<'projects'>>> {
  const entries = await getCollection('projects');
  const slugs = new Set(services.map((s) => s.slug));
  const unknown = entries.filter((e) => !slugs.has(e.id)).map((e) => `src/content/projects/${e.id}.mdx`);
  if (unknown.length > 0) {
    throw new Error(`services.ts에 없는 slug의 상세 본문이 있습니다.\n- ${unknown.join('\n- ')}`);
  }
  return new Map(entries.map((e) => [e.id, e]));
}
