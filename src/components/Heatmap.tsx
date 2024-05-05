"use client";

import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Card } from "./ui/card";

export type HeatMapProps = {
  title: string;
  info?: string | React.ReactNode;
  data: {
    data: {
      id: string;
      data: {
        x: string;
        y: number;
      }[];
    }[];
    minValue: number;
    maxValue: number;
  };
};

export const Heatmap = ({ title, data }: HeatMapProps) => {
  if (!data || data.data.length === 0) return null;

  const theme = {
    axis: {
      ticks: {
        text: {
          fill: "#f2f2f2",
          fontSize: "10px",
        },
      },
    },
  };

  return (
    <Card className="relative h-72 w-full col-span-2 overflow-hidden">
      <div className="flex h-full flex-grow flex-col gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ResponsiveHeatMap
          data={data.data}
          theme={theme}
          margin={{ left: 35, right: 15, top: 0, bottom: 35 }}
          borderRadius={0}
          enableLabels={false}
          forceSquare={false}
          isInteractive={false}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -72,
          }}
          axisTop={null}
          axisBottom={{
            tickSize: 3,
            tickPadding: 0,
            tickRotation: -90,
            legend: "",
            legendPosition: "middle",
            legendOffset: 0,
          }}
          legends={[]}
          colors={{
            type: "sequential",
            scheme: "purples",
            minValue: data.minValue,
            maxValue: data.maxValue,
          }}
          emptyColor="#1C1C1E"
        />
      </div>
    </Card>
  );
};
