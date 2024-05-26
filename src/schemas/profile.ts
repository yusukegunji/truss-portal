import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z
      .string({ required_error: "名前は必須です" })
      .min(1, { message: "名前を入力してください" })
      .max(255, { message: "名前は255文字以内で入力してください" }),
    email: z.string().email("Emailの形式が正しくありません"),
  })
  .required();

export type ProfileSchemaData = z.infer<typeof ProfileSchema>;
