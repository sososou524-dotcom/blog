import { client } from "./microcms";
import type { MicroCMSPost } from "./microcms";

export const POSTS_PER_PAGE = 10;

export type Post = MicroCMSPost;

export async function getAllPosts(): Promise<Post[]> {
  const data = await client.getList<MicroCMSPost>({
    endpoint: "blog",
    queries: {
      limit: 100,
      orders: "-date",
    },
  });
  return data.contents;
}

export async function getPostById(id: string): Promise<Post> {
  return await client.getListDetail<MicroCMSPost>({
    endpoint: "blog",
    contentId: id,
  });
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.flatMap((p) => p.tags ?? []);
  return [...new Set(tags)].sort();
}

export function filterPosts(
  posts: Post[],
  tag?: string | null,
  year?: string | null,
  month?: string | null
) {
  return posts.filter((post) => {
    const date = new Date(post.date);
    if (tag && !(post.tags ?? []).includes(tag)) return false;
    if (year && String(date.getFullYear()) !== year) return false;
    if (month && String(date.getMonth() + 1).padStart(2, "0") !== month) return false;
    return true;
  });
}

export function paginatePosts(posts: Post[], page: number) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const items = posts.slice(start, start + POSTS_PER_PAGE);
  return { items, currentPage, totalPages, total };
}
