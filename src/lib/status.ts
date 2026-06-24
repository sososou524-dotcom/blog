import { client } from "./microcms";
import type { MicroCMSStatus } from "./microcms";

export async function getStatus(): Promise<MicroCMSStatus | null> {
  try {
    return await client.getObject<MicroCMSStatus>({
      endpoint: "status",
    });
  } catch {
    return null;
  }
}
