import { formatNumber } from "@/lib/utils";

import { db } from "../db";

export async function getConnectedAddresses() {
  const startTime = Date.now();

  const result = await db
    .selectFrom("verifications")
    .select(({ fn }) => fn.countAll().as("count"))
    .executeTakeFirst();

  const endTime = Date.now();
  console.log(`getConnectedAddresses took ${endTime - startTime}ms`);

  return result ? formatNumber(result.count.toString()) : "n/a";
}
