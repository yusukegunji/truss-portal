import "server-only";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "../../../types/database";

export const getUsers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*");

  return data;
};

export const getUser = async (id: string): Promise<Tables<"profiles">> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", id)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data as Tables<"profiles">;
};
