import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/types/database.types";

export default defineEventHandler(async (event) => {
  try {
    const dogId = getRouterParam(event, "id");
    if (!dogId) {
      throw createError({
        statusCode: 400,
        message: "Dog ID is required",
      });
    }

    const client = await serverSupabaseClient<Database>(event);
    const { data, error } = await client
      .from("dog_excretions")
      .select("*")
      .eq("dog_id", dogId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return data;
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: "Failed to fetch latest excretion",
    });
  }
});
