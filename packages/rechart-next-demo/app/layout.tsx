import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "Business Analytics Dashboard",
  description: "A Recharts powered business analytics dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          <NavBar />
          <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
            <SideBar className="hidden h-auto w-64 shrink-0 border-r border-slate-200 bg-white/90 lg:block dark:border-slate-800 dark:bg-slate-950" />
            <main className="min-w-0 flex-1 overflow-auto">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
