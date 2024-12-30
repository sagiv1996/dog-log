import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/types/database.types";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const { data } = await client.from("graph_view").select("*");
  return data;
});
