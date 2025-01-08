import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/types/database.types";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const { data } = await client
    .from("dog")
    .select("*, graph_view(*), dog_access(*, profile!inner(*))");
  return data;
});
