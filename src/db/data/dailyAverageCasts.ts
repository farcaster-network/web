import { sql } from "kysely";
import { db } from "../db";

export async function getDailyAverageCasts() {
    const result = await sql<{ date: string, casts: number }>`
        WITH DailyCasts AS (
            SELECT
                DATE(casts."timestamp") AS activity_date,
                COUNT(*) AS total_casts  -- Count all casts per day
            FROM
                casts
            WHERE
                casts.timestamp >= CURRENT_DATE - INTERVAL '29 days' AND
                casts.timestamp < CURRENT_DATE  -- Exclude today's data
            GROUP BY
                DATE(casts."timestamp")
        )
        SELECT
            date_series.date AS date,
            COALESCE(CAST(DailyCasts.total_casts AS INTEGER), 0) AS casts
        FROM
            (SELECT generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE - INTERVAL '1 day', '1 day') AS date) AS date_series
        LEFT JOIN
            DailyCasts ON DailyCasts.activity_date = date_series.date
        ORDER BY
            date_series.date;
    `.execute(db);

    const formattedData = result.rows.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        casts: item.casts  
    }));

    return formattedData;
}
