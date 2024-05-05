import { redirect } from "next/navigation";
import { currentUser } from "../data/auth";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <div>DashBoard</div>
    </div>
  );
}
