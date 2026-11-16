import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 서비스 상세 페이지 본문. 파일 이름이 services.ts의 slug와 같아야 한다(src/content/projects/<slug>.mdx).
 * services.ts에 없는 slug의 파일은 빌드 에러다(src/lib/projects.ts).
 * 제목·설명·링크는 services.ts에서 가져오므로 frontmatter는 없어도 된다.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: z.object({}).strict(),
});

export const collections = { projects };
