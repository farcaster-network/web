import { sql } from "kysely";

import { db } from "../db";

export async function getTotalUsers() {
  const result = await sql<{ users: string }>`
    SELECT CAST(COUNT(DISTINCT fid) AS VARCHAR) AS users
    FROM users;
  `.execute(db);

  return result.rows.length > 0 ? result.rows[0].users : "0";
}
