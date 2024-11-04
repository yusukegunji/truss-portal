import { redirect } from "next/navigation";
import { currentUser } from "../data/auth";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./_components/editor"), { ssr: false });

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <Editor user={user} />
    </div>
  );
}
