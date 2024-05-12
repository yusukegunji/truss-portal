import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tables } from "../../../../types/database";
import ProfileForm from "./profile-form";

export default function ProfileDialog({
  profile,
}: {
  profile: Tables<"profiles">;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">プロフィールを編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>プロフィールを編集</DialogTitle>
          <DialogDescription>
            ここでプロフィールを変更します。完了したら保存をクリックしてください
          </DialogDescription>
        </DialogHeader>

        <ProfileForm profile={profile} />
      </DialogContent>
    </Dialog>
  );
}
