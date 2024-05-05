import { sql } from "kysely";
import { db } from "../db";

export async function getDailyActiveUsers() {
  const result = await sql<{ casts: string }>`
      SELECT CAST(COUNT(*) AS VARCHAR) AS casts
      FROM casts
    `.execute(db);

  return result.rows.length > 0 ? result.rows[0].casts : "0";
}
