import { clsx, type ClassValue } from "clsx";
import { format, formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
}
export function formatDateWithTime(date: string | Date): string {
  return format(new Date(date), "Do MMMM yyyy");
}
