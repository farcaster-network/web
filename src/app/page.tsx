import { DailyActiveCasters } from "@/components/ActiveUsers";
import { AverageCasts } from "@/components/AverageCasts";
import { AverageMessages } from "@/components/AverageMessages";
import { Cell, CellOrientation } from "@/components/Cell";
import { Heatmap } from "@/components/Heatmap";
import { getConnectedAddresses } from "@/db/data/connectedAddresses";
import { getDailyActiveCasters } from "@/db/data/dailyActiveCasters";
import { getDailyAverageCasts } from "@/db/data/dailyAverageCasts";
import { getHeatmapData } from "@/db/data/heatmap";
import { getProtocolRevenue } from "@/db/data/protocolRevenue";
import { getTotalCasts } from "@/db/data/totalCasts";
import { getTotalHubs } from "@/db/data/totalHubs";
import { getTotalUsers } from "@/db/data/totalUsers";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center justify-center gap-4 p-8">
       <div className="mb-4 w-full">
        <div className="text-2xl cursor-default text-white-text font-bold">Dashboard</div>
      </div>
      <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-6 xl:grid-cols-5">
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
          className="md:col-span-3 xl:col-span-1"
        />
        <Cell
          orientation={CellOrientation.Vertical}
          title="Protocol Revenue (ETH)"
          displayData={await getProtocolRevenue()}
          className="col-span-2 md:col-span-3 xl:col-span-1"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        <DailyActiveCasters title="Daily Active Casters" data={await getDailyActiveCasters()} />
        <AverageCasts title="Daily Average Casts" data={await getDailyAverageCasts()} />
        <AverageMessages />
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <Heatmap title="Cast Activity" data={await getHeatmapData()} />      
      </div>
    </main>
  );
}
