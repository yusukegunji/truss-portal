import "server-only";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "../../../types/database";

export const getUsers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*");

  return data;
};

export const getUser = async (id: string): Promise<Tables<"users">> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  console.log(data, "data");

  return data as Tables<"profiles">;
};
