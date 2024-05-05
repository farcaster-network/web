"use client";

import { LineChart as TremorLineChart } from "@tremor/react";
import { useState } from "react";

import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type ActiveUsersProps = {
  title: string;
  data: any[];
};

export function DailyActiveCasters({ title, data }: ActiveUsersProps) {
  const [period, setPeriod] = useState("daily");

  const handlePeriodChange = (period: string) => {
    setPeriod(period);
  };

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>
      </div>
      <TremorLineChart
        className="h-60 text-xs"
        data={data}
        index="date"
        categories={["users"]}
        colors={["indigo", "rose"]}
        yAxisWidth={60}    
      />
    </Card>
  );
}
