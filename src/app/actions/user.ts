"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "../../../types/database";

export const updateProfile = async (
  id: number,
  profile: Pick<Tables<"profiles">, "name" | "email">
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};
