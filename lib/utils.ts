import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateDescription = (description: string, wordLimit: number = 10): string => {
  const words = description.split(' ');
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(' ') + '...';
}

