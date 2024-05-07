import { cn, formatNumber } from "@/lib/utils";

import { Card } from "./ui/card";

export type CellProps = {
  orientation: CellOrientation;
  displayData: string;
  title: string;
  info?: string | React.ReactNode;
  graphData?: any;
  className?: string;
};

export enum CellOrientation {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export const Cell = ({
  orientation,
  displayData,
  graphData,
  title,
  className,
}: CellProps) => {
  return (
    <Card className={cn(["rounded-none", className])}>
      <div
        className={cn(
          "flex h-max",
          orientation === CellOrientation.Horizontal
            ? "flex-1 flex-row items-center"
            : "flex-col"
        )}
      >
        <div
          className={cn(
            "font-bold leading-5 text-white md:text-xl",
            orientation === CellOrientation.Horizontal
              ? "flex-1 text-left"
              : "basis-1 pb-2"
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "text-2xl text-white md:text-4xl lg:text-4xl",
            orientation === CellOrientation.Horizontal
              ? "flex-1 text-right lg:text-5xl"
              : "basis-1 pt-1"
          )}
        >
          {formatNumber(displayData)}
        </div>
      </div>
      {graphData !== undefined && (
        <div
          className={cn(
            "flex",
            orientation === CellOrientation.Horizontal ? "" : "h-full"
          )}
        >
          <div className="graph flex h-16 w-full flex-row justify-around gap-1 self-end overflow-hidden rounded-b-md">
            {graphData &&
              graphData.map((data: any, index: any) => (
                <div
                  className="bar w-full self-end bg-main-purple"
                  key={index}
                  style={{ height: `${data}%` }}
                />
              ))}
          </div>
        </div>
      )}
    </Card>
  );
};
