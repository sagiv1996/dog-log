import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data } = await client
    .from("dog")
    .select("*, graph_view(*), dog_access(*, profile!inner(*))");

  return data;
});
