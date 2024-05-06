import Link from "next/link";
import { Button } from "./ui/button";
import { currentUser } from "@/app/data/auth";
import { signOut } from "@/app/actions/auth";
import { ModeToggle } from "./theme-toggle-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

      <div className="flex items-center gap-4">
        {!user ? (
          <Button asChild>
            <Link href="/signin">ログイン</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className=" font-semibold">
              <Link href="/dashboard">ダッシュボード</Link>
            </Button>

            <ModeToggle></ModeToggle>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {user.user_metadata.full_name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>アカウント</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={signOut}>
                    <Button asChild variant="ghost">
                      <Link href="/signin">ログアウト</Link>
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
