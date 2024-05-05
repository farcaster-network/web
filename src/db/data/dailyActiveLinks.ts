import { sql } from "kysely";

import { db } from "../db";

export async function getDailyAverageLinks() {
  const result = await sql<{ date: string; links: number }>`
        WITH DailyLinks AS (
            SELECT
                DATE(links.timestamp) AS activity_date,
                COUNT(*) AS total_links,
                COUNT(DISTINCT fid) AS unique_fids  -- Count distinct fids per day
            FROM
                links
            WHERE
                links.timestamp >= CURRENT_DATE - INTERVAL '29 days' AND
                links.timestamp < CURRENT_DATE  -- Exclude today's data
            GROUP BY
                DATE(links.timestamp)
        )
        SELECT
            date_series.date AS date,
            COALESCE(CAST(DailyLinks.total_links AS INTEGER), 0) AS links
        FROM
            (SELECT generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE - INTERVAL '1 day', '1 day') AS date) AS date_series
        LEFT JOIN
            DailyLinks ON DailyLinks.activity_date = date_series.date
        ORDER BY
            date_series.date;
    `.execute(db);

  const formattedData = result.rows.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    count: item.links,
  }));

  return formattedData;
}
