import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/types/database.types";
import { z } from "zod";

const idSchema = z.object({
  id: z.preprocess((value) => Number(value), z.number().positive().int()),
});
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const client = await serverSupabaseClient<Database>(event);
  const { data } = await client
    .from("dog")
    .select("*, graph_view(*)")
    .eq("id", id)
    .single();
  return data;
});
