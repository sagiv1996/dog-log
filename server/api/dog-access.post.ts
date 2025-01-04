import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod";

const dogAccess = z.object({
  dog_id: z.number(),
  email: z.string().email(),
});
export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { dog_id, email } = dogAccess.parse(body);

    const { data: profile, error: errorProfile } = await client
      .from("profile")
      .select("*")
      .eq("email", email)
      .single();
    if (errorProfile || !profile) {
      throw "Error with profile";
    }
    const { error, data } = await client
      .from("dog_access")
      .insert({ dog_id, user_id: profile.id! });
    if (error) {
      throw "Error with dog_access";
    }
    console.log({ profile });
    return profile;
  } catch (error) {
    throw error;
  }
});
