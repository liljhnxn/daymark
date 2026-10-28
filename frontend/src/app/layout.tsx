import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DayMark — On-Chain Daily Check-In",
  description: "One day. One check-in. On-chain. Record your daily check-in on Botchain Mainnet.",
  keywords: ["DayMark", "Botchain", "Web3", "dApp", "Daily Check-In", "Blockchain"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
