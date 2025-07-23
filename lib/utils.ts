import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para formatear números con decimales específicos
export function formatNumber(value: number, decimals: number = 3): string {
  return Number(value).toFixed(decimals);
}

// Función para validar números
export function isValidNumber(value: any): boolean {
  return !isNaN(value) && isFinite(value) && value !== null && value !== undefined;
}

// Función para convertir a número seguro
export function toSafeNumber(value: any, fallback: number = 0): number {
  const num = Number(value);
  return isValidNumber(num) ? num : fallback;
}
