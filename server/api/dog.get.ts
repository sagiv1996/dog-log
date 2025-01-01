import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data } = await client
    .from("dog_access")
    .select("dog(id, name, birth_date), profile(*)");
  return data;
});
