import { currentUser } from "@/app/data/auth";
import { getUser } from "@/app/data/user";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import ProfileDialog from "../_components/profile-dialog";

export default async function ProfilePage() {
  const user: User | null = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await getUser(user?.id);

  return (
    <div>
      <h2 className="text-bold mb-6">プロフィール</h2>

      <ProfileDialog profile={profile}></ProfileDialog>
    </div>
  );
}
