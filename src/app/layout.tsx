import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/Providers";

const sourGummy = localFont({
  src: "./fonts/SourGummy-SemiBold.ttf",
  variable: "--font-sour-gummy",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Funny memory game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourGummy.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
