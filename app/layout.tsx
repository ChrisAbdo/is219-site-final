import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/layout/nav";

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
    <html lang="en">
      <body
        className={`${GeistMono.className} antialiased px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 py-6 sm:py-12 md:py-16 lg:py-20 xl:py-24 uppercase`}
      >
        <div className="flex flex-col gap-8">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
