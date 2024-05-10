import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(data: string) {
  const number = parseFloat(data);
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
    compactDisplay: "short",
  });

  return formatter.format(number);
}

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const bytesPerKilobyte = 1024;
  const decimalPlaces = 2;
  const sizeUnits = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(bytesPerKilobyte));

  return `${parseFloat((bytes / Math.pow(bytesPerKilobyte, sizeIndex)).toFixed(decimalPlaces))} ${sizeUnits[sizeIndex]}`;
}
