import Link from "next/link";
import { Button } from "./ui/button";
import { currentUser } from "@/app/data/auth";
import { signOut } from "@/app/actions/auth";

export default async function Header() {
  const user = await currentUser();
  return (
    <header className="h-14 px-4 border-b flex items-center justify-between">
      <Link href="/" className="font-bold">
        とらぽーと -truss portal-
      </Link>

      <div className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/about">ABOUT</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/tech">TechBlog</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/api-doc">API</Link>
        </Button>
      </div>

      {!user ? (
        <Button asChild>
          <Link href="/signin">ログイン</Link>
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className=" font-semibold">
            <Link href="/dashboard">ダッシュボード</Link>
          </Button>

          <form action={signOut}>
            <Button asChild variant="ghost">
              <Link href="/signin">ログアウト</Link>
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
