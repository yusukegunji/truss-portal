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
    <header className="sticky top-0 h-14 px-4 border-b flex items-center justify-between bg-background z-50">
      <Link href="/" className="font-bold">
        とらぽーと 丸の内
      </Link>

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
                    alt="avatar"
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
                  <Link href="/profile">プロフィール</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form action={signOut}>
                    <span className="cursor-pointer">ログアウト</span>
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
