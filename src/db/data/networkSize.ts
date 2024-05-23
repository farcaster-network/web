import { formatBytes } from "@/lib/utils";

type HubInfo = {
  version: string;
  isSyncing: boolean;
  nickname: string;
  rootHash: string;
  dbStats: {
    numMessages: number;
    numFidEvents: number;
    numFnameEvents: number;
    approxSize: number;
  };
  peerId: string;
  hubOperatorFid: number;
};

export async function getNetworkSize() {
  const hubUrl = new URL(process.env.SERVER_URL + ":2281/v1/info?dbstats=1");
  const response = await fetch(hubUrl);

  const data = (await response.json()) as HubInfo;

  const approxSize = data.dbStats.approxSize;

  if (!approxSize) {
    return "0";
  }

  const approxSizeFormatted = formatBytes(approxSize);

  return approxSizeFormatted;
}
