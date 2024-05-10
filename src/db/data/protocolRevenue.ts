import { createPublicClient, formatEther, http } from "viem";
import { optimism } from "viem/chains";

import { formatNumber } from "@/lib/utils";

const client = createPublicClient({
  chain: optimism,
  transport: http(),
});

export async function getProtocolRevenue() {
  const rawBalance = await client.getBalance({
    address: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
  });

  return formatNumber(formatEther(rawBalance)) + " ETH";
}
