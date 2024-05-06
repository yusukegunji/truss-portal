import SideNav from "@/app/(main)/_components/side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    { name: "ホーム", icon: "home", path: "/" },
    { name: "Info", icon: "info", path: "info" },
    { name: "リソース", icon: "file-text", path: "resource" },
    { name: "リリース情報", icon: "rocket", path: "release" },
    { name: "メンバー", icon: "users", path: "member" },
    { name: "プロジェクト", icon: "gantt-chart", path: "project" },
    { name: "開発", icon: "code", path: "develop" },
    { name: "API", icon: "globe", path: "api-docs" },
    { name: "ブログ", icon: "rss", path: "blog" },
  ];

  return (
    <div>
      <SideNav items={items}></SideNav>

      <main className="pl-64 pt-8 container">{children}</main>
    </div>
  );
}
