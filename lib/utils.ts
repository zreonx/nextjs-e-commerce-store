import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { number } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/not-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldError = Object.keys(error.issues).map(
      (field) => error.issues[field].message
    );

    return fieldError.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // hanlde prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist.`;
  } else {
    // handle other error
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error);
  }
}

// Round number to 2 decimal places

export function round2(value: number | string) {
  if (typeof value == "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value == "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
}
