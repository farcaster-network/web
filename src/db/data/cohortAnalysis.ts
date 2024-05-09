import { sql } from "kysely";

import { db } from "../db";

export async function getCohortAnalysis() {
  const startTime = Date.now();

  const result = await sql<{
    cohort: string;
    size: number;
    week: string;
    users: number;
  }>`
    WITH cohorts AS (
        SELECT
        fid,
        DATE_TRUNC('week', registered_at) AS cohort_week
        FROM
        fids
        WHERE
        registered_at >= DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '11 weeks'
    ),
    cohort_size AS (
        SELECT
        cohort_week,
        COUNT(DISTINCT fid) AS cohort_size
        FROM
        cohorts
        GROUP BY
        cohort_week
    ),
    user_activity AS (
        SELECT
        c.fid,
        DATE_TRUNC('week', ca.timestamp) AS activity_week,
        COUNT(*) AS cast_count
        FROM
        casts ca
        JOIN cohorts c ON ca.fid = c.fid
        WHERE
        ca.timestamp >= DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '11 weeks'
        GROUP BY
        c.fid,
        DATE_TRUNC('week', ca.timestamp)
    ),
    cohort_activity AS (
        SELECT
        c.cohort_week,
        ua.activity_week,
        COUNT(DISTINCT ua.fid) AS active_users
        FROM
        cohorts c
        LEFT JOIN user_activity ua ON c.fid = ua.fid
            AND ua.activity_week >= c.cohort_week
            AND ua.activity_week <= DATE_TRUNC('week', CURRENT_DATE)
        GROUP BY
        c.cohort_week,
        ua.activity_week
    )
    SELECT
        ca.cohort_week as cohort,
        cs.cohort_size as size,
        ca.activity_week as week,
        ca.active_users as users
    FROM
        cohort_activity ca
        JOIN cohort_size cs ON ca.cohort_week = cs.cohort_week
    WHERE
        ca.cohort_week >= DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '11 weeks'
    ORDER BY
        ca.cohort_week,
        ca.activity_week;
    `.execute(db);

  const endTime = Date.now();
  console.log(`getCohortAnalysis took ${endTime - startTime}ms`);

  return result.rows;
}
