import { Cell, CellOrientation } from "@/components/Cell";
import { ChartCell } from "@/components/ChartCell";
import { Heatmap } from "@/components/Heatmap";
import { getConnectedAddresses } from "@/db/data/connectedAddresses";
import { getDailyActiveCasters } from "@/db/data/dailyActiveCasters";
import { getDailyAverageLinks } from "@/db/data/dailyActiveLinks";
import { getDailyAverageCasts } from "@/db/data/dailyAverageCasts";
import { getHeatmapData } from "@/db/data/heatmap";
import { getIndexerStats } from "@/db/data/indexerStats";
import { getNetworkSize } from "@/db/data/networkSize";
import { getProtocolRevenue } from "@/db/data/protocolRevenue";
import { getTotalCasts } from "@/db/data/totalCasts";
import { getTotalHubs } from "@/db/data/totalHubs";
import { getTotalUsers } from "@/db/data/totalUsers";

export default async function Home() {
  const indexerStats = await getIndexerStats();

  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center justify-center gap-2 p-4 md:gap-4 md:p-8">
      <div className="mb-4 w-full cursor-default">
        <h1 className="mb-2 text-2xl font-bold text-white-text">Dashboard</h1>
        <p className="max-w-xl text-sm text-slate-400">
          This website was originally created in 2022, and revived during Farcon
          2024. Excuse minor innacuracies as we tighten up the code.
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-6 md:gap-4 xl:grid-cols-6">
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Casts"
          displayData={await getTotalCasts()}
          className="md:col-span-2 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Users"
          displayData={await getTotalUsers()}
          className="md:col-span-2 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Hubs"
          displayData={await getTotalHubs()}
          className="md:col-span-2 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Connected Addresses"
          displayData={await getConnectedAddresses()}
          className="md:col-span-2 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Network Size"
          displayData={await getNetworkSize()}
          className="md:col-span-2 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Protocol Revenue"
          displayData={await getProtocolRevenue()}
          className="md:col-span-2 xl:col-span-1"
        />
      </div>
      <div className="grid w-full gap-2 md:gap-4 lg:grid-cols-3">
        <ChartCell
          title="Daily Active Casters"
          data={await getDailyActiveCasters()}
        />
        <ChartCell
          title="Daily Average Casts"
          data={await getDailyAverageCasts()}
        />
        <ChartCell
          title="Daily Average Links"
          data={await getDailyAverageLinks()}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3">
        <Heatmap title="Cast Activity (UTC)" data={await getHeatmapData()} />
      </div>

      {indexerStats && (
        <p className="w-full text-sm text-slate-400">
          {indexerStats.isBackfillActive
            ? "Backfill is incomplete"
            : `Last updated ${new Date(indexerStats.latestEventTimestamp).toLocaleString("en-US", { timeZone: "UTC" })} UTC`}
        </p>
      )}
    </main>
  );
}
