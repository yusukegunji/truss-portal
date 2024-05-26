import * as z from "zod";

export const EditorSchema = z.object({
  title: z.string().min(10, {
    message: "タイトルは10文字以上です",
  }),
  categoryId: z.string(),
  content: z.string().min(50, {
    message: "コンテンツは50文字以上です",
  }),
  imageUrl: z.string().url({
    message: "URLが無効です",
  }),
  isPublished: z.boolean(),
});

export type EditorSchemaType = z.infer<typeof EditorSchema>;
