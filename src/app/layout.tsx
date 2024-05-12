import Header from "@/components/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/app/(main)/_components/side-nav";
import { Categories } from "@/assets/data/category";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "とらぽーと",
  description: "truss inc. portal site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body className={cn(inter.className, "min-h-dvh")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <SideNav items={Categories}></SideNav>
          <main>{children}</main>
          <Footer />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
