import * as z from "zod";

export const PostSchema = z.object({
  title: z.string().min(10, {
    message: "タイトルは10文字以上です",
  }),
  categoryId: z.string(),
  tags: z.array(
    z.string().max(8, {
      message: "タグは8文字以内です",
    })
  ),
  body: z.string().min(50, {
    message: "コンテンツは50文字以上です",
  }),
  imageUrl: z.string().url({
    message: "URLが無効です",
  }),
  isPublished: z.boolean(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
