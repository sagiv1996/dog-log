import { z } from "zod";
import { Database } from "~~/types/database.types";

export type DogExcretionsInsert =
  Database["public"]["Tables"]["dog_excretions"]["Insert"];

export const dogExcretionValidationSchema: z.ZodType<DogExcretionsInsert> =
  z.object({
    date: z.string().optional(),
    dog_id: z.number(),
    location: z.enum(["outdoors", "indoors"]),
    notes: z.string().nullable().optional().default("Is value from api"),
    type: z.enum(["poop", "pee"]),
  });
