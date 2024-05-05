"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const host =
  process.env.NODE_ENV === "production"
    ? "https://example.com" // 本番環境の URL
    : "http://localhost:3000";

export const signInAnonyMously = async () => {
  const supabase = createClient();
  await supabase.auth.signInAnonymously();
};

export const signInWithGithub = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${host}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};
