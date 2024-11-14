import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ToastProps } from "@/components/ui/toast"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export type Toast = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  duration?: number
}
