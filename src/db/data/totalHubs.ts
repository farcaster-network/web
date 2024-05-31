import { formatNumber } from "@/lib/utils";

import { db } from "../db";

export async function getTotalHubs() {
  const startTime = Date.now();

  const result = await db
    .selectFrom("hubs")
    .select(({ fn }) => fn.countAll().as("count"))
    .executeTakeFirst();

  const endTime = Date.now();
  console.log(`getTotalHubs took ${endTime - startTime}ms`);

  return result ? formatNumber(result.count.toString()) : "n/a";
}
