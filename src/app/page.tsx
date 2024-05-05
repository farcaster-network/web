import { ActiveUsers } from "@/components/ActiveUsers";
import { AverageCasts } from "@/components/AverageCasts";
import { AverageMessages } from "@/components/AverageMessages";
import { Cell, CellOrientation } from "@/components/Cell";
import { CohortAnalysis } from "@/components/CohortAnalysis";
import { Heatmap } from "@/components/Heatmap";
import { getConnectedAddresses } from "@/db/data/connectedAddresses";
import { getHeatmapData } from "@/db/data/heatmap";
import { getProtocolRevenue } from "@/db/data/protocolRevenue";
import { getTotalCasts } from "@/db/data/totalCasts";
import { getTotalHubs } from "@/db/data/totalHubs";
import { getTotalUsers } from "@/db/data/totalUsers";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center gap-4 p-8">
      <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Casts"
          displayData={await getTotalCasts()}
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Users"
          displayData={await getTotalUsers()}
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Total Hubs"
          displayData={await getTotalHubs()}
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Connected Addresses"
          displayData={await getConnectedAddresses()}
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Network Size"
          displayData={"1,000,000"}
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Protocol Revenue (ETH)"
          displayData={await getProtocolRevenue()}
        />
      </div>
      <div className="grid h-full w-full gap-4 md:grid-cols-3">
        <ActiveUsers />
        <AverageCasts />
        <AverageMessages />
      </div>
      <div className="grid h-full w-full grid-cols-3 gap-4">
        <Heatmap title="Cast Activity" data={await getHeatmapData()} />
        <CohortAnalysis
          title="Retention"
          info="This is a cohort analysis"
          data={[]}
        />
      </div>
    </main>
  );
}
