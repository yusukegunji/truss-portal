"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Edit, Eye, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditorSchema, EditorSchemaType } from "../schema/editor-schema";
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
import { Badge } from "@/components/ui/badge";

export default function Editor({
  onHandleSubmit,
}: {
  onHandleSubmit: (data: EditorSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);

  const form = useForm<z.infer<typeof EditorSchema>>({
    mode: "all",
    resolver: zodResolver(EditorSchema),
    defaultValues: {
      //   title: defaultBlog?.title,
      //   content: defaultBlog?.blog_content.content,
      //   image_url: defaultBlog?.image_url,
      //   is_premium: defaultBlog?.is_premium,
      //   is_published: defaultBlog?.is_published,
    },
  });

  const onSubmit = (data: z.infer<typeof EditorSchema>) => {
    startTransition(() => {
      onHandleSubmit(data);
    });
  };

  console.log(form.getValues().categoryId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex items-center sm:justify-between flex-wrap sm:flex-row gap-2">
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

          <div className="flex items-center flex-wrap gap-5">
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
                <div className="w-full grid  grid-cols-2 items-center break-words p-2 gap-2">
                  <div className="w-full">
                    <Label htmlFor="title">タイトル</Label>
                    <Input placeholder="" {...field} autoFocus />
                  </div>
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : " w-1/2 lg:block hidden "
                    )}
                  >
                    <h1 className="text-3xl font-bold dark:text-gray-200">
                      {form.getValues().title || "タイトル"}
                    </h1>
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
                <div className="w-full grid grid-cols-2 items-center p-2 gap-2">
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
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : " w-1/2 lg:block hidden "
                    )}
                  >
                    <Badge variant="outline">
                      {Categories.find(
                        (category) =>
                          category.id.toString() === form.getValues().categoryId
                      )?.name || "カテゴリー"}
                    </Badge>
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
                  <div className="w-full grid grid-cols-2 items-center break-words p-2 gap-2">
                    <div className="w-full">
                      <Label htmlFor="imageUrl">サムネイル</Label>
                      <Input id="picture" type="file" />
                    </div>
                    <div
                      className={cn(
                        " relative",
                        isPreview
                          ? "px-0 mx-auto w-full lg:w-4/5 "
                          : "px-10 w-1/2 lg:block hidden"
                      )}
                    >
                      <div className="aspect-video w-full relative mt-10 border rounded-md">
                        <Image
                          src={form.getValues().imageUrl}
                          alt="preview"
                          fill
                          className="object-cover object-center rounded-md"
                        />
                      </div>
                    </div>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full grid grid-cols-2 items-center break-words p-2 gap-2">
                  <Textarea
                    placeholder="本文を入力してください"
                    className="min-h-80"
                    {...field}
                  />
                  <div
                    className={cn(
                      "overflow-scroll h-full",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    {/* <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    /> */}
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
