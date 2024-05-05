import { Card } from "./ui/card";

export type CohortAnalysisProps = {
  title: string;
  info: string;
  data: any[];
};

export function CohortAnalysis({ title, info, data }: CohortAnalysisProps) {
  return (
    <Card className="relative h-72 w-full col-span-1 overflow-hidden">
      <div className="flex h-full flex-grow flex-col gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </Card>
  );
}
