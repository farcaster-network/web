import { formatNumber } from "@/lib/utils";

import { db } from "../db";

export async function getTotalCasts() {
  const startTime = Date.now();

  const result = await db
    .selectFrom("casts")
    .select(({ fn }) => fn.countAll().as("count"))
    .executeTakeFirst();

  const endTime = Date.now();
  console.log(`getTotalCasts took ${endTime - startTime}ms`);

  return result ? formatNumber(result.count.toString()) : "n/a";
}
