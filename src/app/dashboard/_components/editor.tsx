"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Edit, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostSchema, PostSchemaType } from "../schema/editor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Categories } from "@/assets/data/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import ImageCropper from "./image-cropper";
import { PostgrestSingleResponse, User } from "@supabase/supabase-js";

import { toast } from "@/components/ui/use-toast";
import { createPost } from "@/app/actions/post";
import { uploadImage } from "@/app/actions/upload-image";

export default function Editor({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);

  const form = useForm<z.infer<typeof PostSchema>>({
    mode: "all",
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      body: "",
      categoryId: "",
      tags: [],
      imageUrl: "",
      isPublished: false,
    },
  });

  const onHandleSubmit = async (data: PostSchemaType, userId: string) => {
    const result = JSON.parse(await createPost(data, userId));

    const { error } = result as PostgrestSingleResponse<null>;
    if (error?.message) {
      toast({
        title: "記事の作成に失敗しました 😢",
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "記事が作成されました 🎉",
        description: data.title,
      });
    }
  };

  const onSubmit = (data: z.infer<typeof PostSchema>) => {
    startTransition(() => {
      onHandleSubmit(data, user.id);
    });
  };

  console.log(form.getValues().categoryId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container">
        <div className="w-full flex justify-end gap-4">
          <Button
            onClick={() => {
              setPreivew(!isPreview && !form.getFieldState("imageUrl").invalid);
            }}
            tabIndex={0}
            type="button"
          >
            {!isPreview ? (
              <>
                <Eye />
                プレビュー
              </>
            ) : (
              <>
                <Edit />
                編集
              </>
            )}
          </Button>

          <div className="flex items-center justify-end flex-wrap gap-5">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="isPublished">公開</Label>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              role="button"
              disabled={!form.formState.isValid}
            >
              保存
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full p-2">
                  <div className="w-full">
                    <Label htmlFor="title">タイトル</Label>
                    <Input placeholder="" {...field} autoFocus />
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("title").invalid &&
                form.getValues().title && (
                  <div className="px-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full p-2">
                  <div className="w-full">
                    <Label htmlFor="category">カテゴリー</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div className=" w-96 p-2">
                    <Label htmlFor="imageUrl">サムネイル</Label>
                    <ImageCropper
                      width={400}
                      onChange={async (croppedImage) => {
                        console.log(croppedImage);
                        const thumbnail = await uploadImage(croppedImage);
                        form.setValue("imageUrl", thumbnail ? thumbnail : "");
                      }}
                    ></ImageCropper>
                  </div>
                </FormControl>

                <div className="px-3">
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full p-2">
                  <Textarea
                    placeholder="本文を入力してください"
                    className="min-h-80"
                    {...field}
                  />
                </div>
              </FormControl>

              {form.getFieldState("body").invalid && form.getValues().body && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
