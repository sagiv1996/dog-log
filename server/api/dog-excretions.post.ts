import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/types/database.types";
import { z } from "zod";

type DogExcretionsInsert =
  Database["public"]["Tables"]["dog_excretions"]["Insert"];

const insertSchema: z.ZodType<DogExcretionsInsert> = z.object({
  date: z.string().optional(),
  dog_id: z.number(),
  handler_id: z.string(),
  location: z.enum(["outdoors", "indoors"]),
  notes: z.string().nullable().optional().default("Is value from api"),
  type: z.enum(["poop", "pee"]),
});
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = insertSchema.parse(body);
    const client = await serverSupabaseClient<Database>(event);

    const { data, error } = await client
      .from("dog_excretions")
      .insert(validatedData);
    if (error) {
      throw error;
    }
    return { data };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors };
    }
    throw err;
  }
});
