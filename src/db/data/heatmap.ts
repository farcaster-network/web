import { sql } from "kysely";
import { db } from "../db";

export async function getHeatmapData() {
  const result = await sql<{
    day: string;
    hour: string;
    casts: number;
  }>`
    SELECT
      EXTRACT(ISODOW FROM timestamp) AS day,  -- ISODOW returns 1 for Monday through 7 for Sunday
      EXTRACT(HOUR FROM timestamp) AS hour,
      CAST(COUNT(*) AS INTEGER) AS casts
    FROM
      casts
    WHERE
      timestamp >= NOW() - INTERVAL '1 week'
      AND deleted_at IS NULL
    GROUP BY
      day, hour
    ORDER BY
      day, hour
  `.execute(db);

  // Transform the fetched data
  const fetchedData = result.rows;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate global minValue and maxValue
  const numCastsArray = fetchedData.map((data) => data.casts);
  const minValue = Math.min(...numCastsArray);
  const maxValue = Math.max(...numCastsArray);

  // Format data for visualization
  // Format data for visualization
  const transformedData = days.map((day, index) => ({
    id: day,
    data: Array.from({ length: 24 }, (_, hour) => {
      // Adjust index to match SQL ISODOW output (1 for Monday, 7 for Sunday)
      const dayOfWeek = index === 0 ? 7 : index;

      return {
        x: hour.toString(),
        y:
          fetchedData.find(
            (d) => d.day === dayOfWeek.toString() && d.hour === hour.toString()
          )?.casts || 0,
      };
    }),
  }));

  return {
    data: transformedData,
    minValue,
    maxValue,
  };
}
