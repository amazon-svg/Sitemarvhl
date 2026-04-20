// Re-export du bundle généré + helpers. Pas de parsing au runtime.
export { blogPosts } from './blog-index.generated';
export type { BlogPost, BlogFrontmatter } from './blog-index.generated';

import { blogPosts } from './blog-index.generated';
import type { BlogPost } from './blog-index.generated';

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
