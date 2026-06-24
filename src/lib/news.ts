import { client } from "./microcms";
import type { MicroCMSNews } from "./microcms";

export async function getAllNews(): Promise<MicroCMSNews[]> {
  const data = await client.getList<MicroCMSNews>({
    endpoint: "news",
    queries: {
      limit: 20,
      orders: "-date",
    },
  });
  return data.contents;
}
