import { Cell, CellOrientation } from "@/components/Cell";
import { ActiveUsers } from "@/components/ActiveUsers";
import { AverageCasts } from "@/components/AverageCasts";
import { Heatmap } from "@/components/Heatmap";
import { AverageMessages } from "@/components/AverageMessages";
import { CohortAnalysis } from "@/components/CohortAnalysis";
import { getTotalCasts } from "@/db/data/totalCasts";
import { getTotalUsers } from "@/db/data/totalUsers";
import { getTotalHubs } from "@/db/data/totalHubs";
import { getConnectedAddresses } from "@/db/data/connectedAddresses";
import { getHeatmapData } from "@/db/data/heatmap";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center flex-wrap gap-4 p-8">
      <div className="grid grid-cols-6 gap-4 w-full h-full">
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
          title="Casts"
          displayData={"1,000,000"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        <ActiveUsers />
        <AverageCasts />
        <AverageMessages />
      </div>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
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
