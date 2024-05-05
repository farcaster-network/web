import { sql } from "kysely";
import { db } from "../db";

export async function getConnectedAddresses() {
  const result = await sql<{ addresses: string }>`
      SELECT CAST(COUNT(*) AS VARCHAR) AS addresses
      FROM verifications
    `.execute(db);

  return result.rows.length > 0 ? result.rows[0].addresses : "0";
}
