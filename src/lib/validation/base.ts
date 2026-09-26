import { z } from "zod";

// We need to define Role if we don't want to rely solely on Prisma client generation
// but let's assume Prisma client has generated it.
import { Role, ContentStatus } from "@prisma/client";

export const idSchema = z.string().cuid("Invalid ID format");

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const roleSchema = z.nativeEnum(Role);
export const contentStatusSchema = z.nativeEnum(ContentStatus);

export function formatZodError(error: any) {
  return error.errors.map((e: any) => ({
    field: e.path.join("."),
    message: e.message,
  }));
}
