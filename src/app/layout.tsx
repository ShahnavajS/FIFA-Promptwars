import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { GlobalProviders } from "@/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "StadiumPulse AI | FIFA World Cup 2026",
  description: "Real-time AI crowd flow, operations, and multilingual concierge companion for the FIFA World Cup 2026.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StadiumPulse AI",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
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
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-neutral-950 text-neutral-50 antialiased overflow-x-hidden`}
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
