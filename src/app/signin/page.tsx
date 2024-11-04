import { Button } from "@/components/ui/button";
import { currentUser } from "../data/auth";
import {
  signInAnonyMously,
  signInWithEmail,
  signInWithGithub,
  signOut,
} from "../actions/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="container flex justify-center">
      <div className="w-60 p-6">
        <div className="flex flex-col gap-6">
          <form action={signInAnonyMously}>
            <Button variant="outline">ゲストでログイン</Button>
          </form>

          <form action={signInWithGithub}>
            <Button>GitHubでログイン</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
