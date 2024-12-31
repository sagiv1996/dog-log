import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~~/types/database.types";
import { z } from "zod";
import { dogExcretionValidationSchema } from "~/shared/schemas/dogExcretions/dogExcretionValidationSchema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { dog_id, location, type } = dogExcretionValidationSchema.parse(body);
    const client = await serverSupabaseClient<Database>(event);
    const { data, error } = await client.from("dog_excretions").insert({
      dog_id,
      location,
      type,
    });
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
