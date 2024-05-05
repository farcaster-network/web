import { sql } from "kysely";

import { db } from "../db";

export async function getTotalHubs() {
  const startTime = Date.now();

  const result = await sql<{ hubs: string }>`
      SELECT CAST(COUNT(*) AS VARCHAR) AS hubs
      FROM hubs
    `.execute(db);

  const endTime = Date.now();
  console.log(`getTotalHubs took ${endTime - startTime}ms`);

  return result.rows.length > 0 ? result.rows[0].hubs : "0";
}
