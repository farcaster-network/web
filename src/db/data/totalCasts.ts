import { sql } from "kysely";

import { formatNumber } from "@/lib/utils";

import { db } from "../db";

export async function getTotalCasts() {
  const startTime = Date.now();

  const result = await sql<{ casts: string }>`
      SELECT CAST(COUNT(*) AS VARCHAR) AS casts
      FROM casts
    `.execute(db);

  const endTime = Date.now();
  console.log(`getTotalCasts took ${endTime - startTime}ms`);

  return result.rows.length > 0 ? formatNumber(result.rows[0].casts) : "0";
}
