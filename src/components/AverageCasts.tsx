"use client";

import { LineChart as TremorLineChart } from "@tremor/react";

import { Card } from "./ui/card";

type AverageCastsProps = {
  title: string;
  data: any[];
};

export function AverageCasts({ title, data }: AverageCastsProps) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <TremorLineChart
        className="h-60 text-xs"
        data={data}
        index="date"
        categories={["casts"]}
        colors={["indigo", "rose"]}
        yAxisWidth={60}
      />
    </Card>
  );
}
