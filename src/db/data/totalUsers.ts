import { formatNumber } from "@/lib/utils";

import { db } from "../db";

export async function getTotalUsers() {
  const startTime = Date.now();

  const result = await db
    .selectFrom("users")
    .select(({ fn }) => fn.countAll().as("count"))
    .executeTakeFirst();

  const endTime = Date.now();
  console.log(`getTotalUsers took ${endTime - startTime}ms`);

  return result ? formatNumber(result.count.toString()) : "n/a";
}
