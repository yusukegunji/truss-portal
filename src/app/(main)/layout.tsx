import { Categories } from "@/assets/data/category";
import SideNav from "./_components/side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideNav items={Categories}></SideNav>
      <main className="p-6 container">{children}</main>
    </div>
  );
}
