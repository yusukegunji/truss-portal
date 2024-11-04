"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./upload-image";

const DASHBOARD = "/dashboard";

export async function createPost(
  data: {
    body: string;
    title: string;
    categoryId: string;
    imageUrl: string;
    isPublished: boolean;
    tags: string[];
  },
  userId: string
) {
  const { ["body"]: excludedKey, ...post } = data;
  const postWithUserId = { ...post, userId: userId };
  const thumbnail = await uploadImage(data.imageUrl);
  const requestData = { ...postWithUserId, imageUrl: thumbnail };

  const supabase = await createClient();
  const blogResult = await supabase
    .from("posts")
    .insert(requestData)
    .select("id")
    .single();

  if (blogResult.error?.message && !blogResult.data) {
    return JSON.stringify(blogResult);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ blog_id: blogResult?.data?.id!, body: data.body });

    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
  }
}
