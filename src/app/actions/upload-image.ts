"use server";

import { createClient } from "@/lib/supabase/server";
import { decode } from "base64-arraybuffer";
import { currentUser } from "../data/auth";

export const uploadImage = async (dataURL?: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("ログインしていません");
  }

  const bucket = "thumbnails";
  const path = `temp/${Date.now()}.jpeg`; // 保存先のパス

  const supabase = createClient();

  if (dataURL?.startsWith("data:")) {
    const base64String = dataURL.split(",")[1];

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, decode(base64String), {
        upsert: true,
        contentType: "image/jpeg",
      });

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    // キャッシュ対策したURLを返す（返却先で画像URLを適宜DBに保存する）
    const imageURL = publicUrl + `?v=${Date.now()}`;

    // DBにURLを保存ならここで

    return imageURL;
  } else if (!dataURL) {
    await supabase.storage.from(bucket).remove([path]);

    return null;
  } else {
    return dataURL;
  }
};
