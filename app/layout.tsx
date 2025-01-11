import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/layout/nav";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "christopher abdo",
  description: "christopher abdo software and design engineer portfolio",
  metadataBase: new URL("https://chrisabdo.dev/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.className} suppressHydrationWarning>
      <body className="antialiased px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 py-6 sm:py-12 md:py-16 lg:py-20 xl:py-24 uppercase">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <MatrixBackground /> */}

          <div className="flex flex-col gap-8 relative z-10">
            <Nav />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
