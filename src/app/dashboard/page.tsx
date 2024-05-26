"use client";

import { redirect, useRouter } from "next/navigation";
import { currentUser } from "../data/auth";
import { EditorSchemaType } from "./schema/editor-schema";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";
import Editor from "./_components/editor";
import { createPost } from "../actions/post";

export default function Page() {
  // const user = await currentUser();

  // if (!user) {
  //   redirect("/signin");
  // }
  const router = useRouter();

  const onHandleSubmit = async (data: EditorSchemaType) => {
    const result = JSON.parse(await createPost(data));

    const { error } = result as PostgrestSingleResponse<null>;
    if (error?.message) {
      toast({
        title: "Fail to create a post 😢",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully create a post 🎉",
        description: data.title,
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6">
      <Editor onHandleSubmit={onHandleSubmit} />
    </div>
  );
}
