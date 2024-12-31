import { z } from "zod";
import type { Database } from "~~/types/database.types";

export type DogInsert = Database["public"]["Tables"]["dog"]["Insert"];

export const dogValidationSchema: z.ZodType<DogInsert> = z.object({
  name: z.string(),
  birth_date: z.string().optional(),
});
