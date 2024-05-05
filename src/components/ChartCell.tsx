"use client";

import { LineChart as TremorLineChart } from "@tremor/react";

import { Card } from "./ui/card";

type Props = {
  title: string;
  data: {
    date: string;
    count: number;
  }[];
};

export function ChartCell({ title, data }: Props) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <TremorLineChart
        className="h-60 text-xs"
        data={data}
        index="date"
        categories={["count"]}
        colors={["indigo", "rose"]}
        yAxisWidth={60}
      />
    </Card>
  );
}
