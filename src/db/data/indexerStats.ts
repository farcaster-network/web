const serverUrl = new URL(process.env.INDEXER_URL || "");

export async function getIndexerStats() {
  try {
    const res = await fetch(serverUrl + "stats");
    const data = await res.json();

    return data as {
      latestEventId: number;
      latestEventTimestamp: number;
      isBackfillActive: boolean;
    };
  } catch {
    return undefined;
  }
}
