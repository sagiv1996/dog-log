import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~~/types/database.types";
import { z } from "zod";
import { dogValidationSchema } from "~/shared/utils/dogValidationSchema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { name, birth_date } = dogValidationSchema.parse(body);
    const client = await serverSupabaseClient<Database>(event);
    const { data, error } = await client.from("dog").insert({
      name,
      birth_date,
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
