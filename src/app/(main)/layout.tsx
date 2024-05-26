export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="pl-64 pt-8 container">{children}</main>
    </div>
  );
}
