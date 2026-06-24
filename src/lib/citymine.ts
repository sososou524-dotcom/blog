import { client } from "./microcms";
import type { MicroCMSCityMinePost } from "./microcms";

export const POSTS_PER_PAGE = 10;

export type CityMinePost = MicroCMSCityMinePost;

export async function getAllCityMinePosts(): Promise<CityMinePost[]> {
  const data = await client.getList<MicroCMSCityMinePost>({
    endpoint: "city-mine",
    queries: {
      limit: 100,
      filters: "draft[equals]false",
    },
  });
  return data.contents;
}

export async function getCityMinePostById(id: string): Promise<CityMinePost> {
  return await client.getListDetail<MicroCMSCityMinePost>({
    endpoint: "city-mine",
    contentId: id,
  });
}

export async function getAllCityMineTags(): Promise<string[]> {
  const posts = await getAllCityMinePosts();
  const tags = posts.flatMap((p) => p.tags ?? []);
  return [...new Set(tags)].sort();
}

export function filterCityMinePosts(
  posts: CityMinePost[],
  tag?: string | null
) {
  return posts.filter((post) => {
    if (tag && !(post.tags ?? []).includes(tag)) return false;
    return true;
  });
}

export function paginateCityMinePosts(posts: CityMinePost[], page: number) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const items = posts.slice(start, start + POSTS_PER_PAGE);
  return { items, currentPage, totalPages, total };
}
