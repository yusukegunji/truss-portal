import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type ProfileSchemaData = z.infer<typeof ProfileSchema>;
