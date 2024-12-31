import { z } from "zod";
import type { Database } from "~~/types/database.types";

export type DogInsert = Database["public"]["Tables"]["dog"]["Insert"];

export const dogValidationSchema: z.ZodType<DogInsert> = z.object({
  name: z.string().min(2),
  birth_date: z.string().datetime().optional(),
});
