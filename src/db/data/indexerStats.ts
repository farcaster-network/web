export async function getIndexerStats() {
  let serverUrl;
  try {
    serverUrl = new URL(process.env.INDEXER_URL || "");
  } catch (error) {
    console.error("Invalid URL:", error);
    return undefined;
  }

  try {
    const res = await fetch(serverUrl + "stats");
    const data = await res.json();

    return data as {
      latestEventId: number;
      latestEventTimestamp: number;
      isBackfillActive: boolean;
    };
  } catch (error) {
    console.error("Failed to fetch indexer stats:", error);
    return undefined;
  }
}
