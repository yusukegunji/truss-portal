"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const DASHBOARD = "/dashboard";

export async function createPost(data: {
  content: string;
  title: string;
  categoryId: string;
  imageUrl: string;
  isPublished: boolean;
}) {
  const { ["content"]: excludedKey, ...post } = data;

  const supabase = await createClient();
  const blogResult = await supabase
    .from("posts")
    .insert(post)
    .select("id")
    .single();

  if (blogResult.error?.message && !blogResult.data) {
    return JSON.stringify(blogResult);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ blog_id: blogResult?.data?.id!, content: data.content });

    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
  }
}
