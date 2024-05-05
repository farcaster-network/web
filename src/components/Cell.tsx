import { cn, formatNumber } from "@/lib/utils";
import { Card } from "./ui/card";

export type CellProps = {
  orientation: CellOrientation;
  displayData: string;
  title: string;
  info?: string | React.ReactNode;
  graphData?: any;
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
}: CellProps) => {
  return (
    <Card className="rounded-none">
      <div
        className={cn(
          "h-max flex",
          orientation === CellOrientation.Horizontal
            ? "flex-1 flex-row items-center"
            : "flex-col"
        )}>
        <div
          className={cn(
            "text-xl font-bold text-white",
            orientation === CellOrientation.Horizontal
              ? "flex-1 text-left"
              : "basis-1 pb-2"
          )}>
          {title}
        </div>
        <div
          className={cn(
            "text-4xl text-white lg:text-4xl",
            orientation === CellOrientation.Horizontal
              ? "flex-1 text-right lg:text-5xl"
              : "pt-1 basis-1"
          )}>
          {formatNumber(displayData)}
        </div>
      </div>
      {graphData !== undefined && (
        <div
          className={cn(
            "flex",
            orientation === CellOrientation.Horizontal ? "" : "h-full"
          )}>
          <div className="graph h-16 w-full flex rounded-b-md self-end justify-around gap-1 flex-row overflow-hidden">
            {graphData &&
              graphData.map((data: any, index: any) => (
                <div
                  className="bar w-full self-end bg-main-purple"
                  key={index}
                  style={{ height: `${data}%` }}></div>
              ))}
          </div>
        </div>
      )}
    </Card>
  );
};
