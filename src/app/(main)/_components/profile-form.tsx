"use client";

import { updateProfile } from "@/app/actions/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ProfileSchema, ProfileSchemaData } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tables } from "../../../../types/database";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";

export default function ProfileForm({
  profile,
}: {
  profile: Tables<"profiles">;
}) {
  const { toast } = useToast();

  const form = useForm<ProfileSchemaData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile.name || "",
      email: profile.email || "",
    },
    mode: "onBlur",
  });

  type ProfileFormType = z.infer<typeof ProfileSchema>;

  const onSubmit: SubmitHandler<ProfileFormType> = async (formData) => {
    console.log(formData, "data");
    const updatedProfile = {
      ...formData,
    };

    console.log(form, form.formState, "form", "formState");

    await updateProfile(profile.id, updatedProfile);

    toast({
      title: "成功しました",
      description: "プロフィールが更新されました",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log(errors, "errors");
        })}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input type="text" className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={!form.formState.isValid}>
            保存
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
