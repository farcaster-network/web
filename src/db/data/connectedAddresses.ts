import { sql } from "kysely";

import { db } from "../db";

export async function getConnectedAddresses() {
  const startTime = Date.now();

  const result = await sql<{ addresses: string }>`
      SELECT CAST(COUNT(*) AS VARCHAR) AS addresses
      FROM verifications
    `.execute(db);

  const endTime = Date.now();
  console.log(`getConnectedAddresses took ${endTime - startTime}ms`);

  return result.rows.length > 0 ? result.rows[0].addresses : "0";
}
