import { Card } from "./ui/card";

export type CohortAnalysisProps = {
  title: string;
  data: any[];
};

export function CohortAnalysis({ title, data }: CohortAnalysisProps) {
  return (
    <Card className="relative col-span-1 h-72 w-full overflow-hidden">
      <div className="flex h-full flex-grow flex-col gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </Card>
  );
}
