import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/themes";
import ThemeWrapper from "./components/ThemeWrapper";
import ThemeSwitcher from "./components/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Sandlot Wisdom - Learn & Play Baseball",
    template: "%s | Sandlot Wisdom",
  },
  description: "Interactive baseball learning and game tracking app for parents and kids. Learn rules, track scores, and find wisdom in the game.",
  keywords: ["baseball", "kids", "learning", "score tracker", "youth baseball", "baseball rules", "backyard baseball"],
  authors: [{ name: "JMBeh" }],
  creator: "JMBeh",
  publisher: "JMBeh",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Sandlot Wisdom",
    title: "Sandlot Wisdom - Learn & Play Baseball",
    description: "Interactive baseball learning and game tracking app for parents and kids. Learn rules, track scores, and find wisdom in the game.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sandlot Wisdom - Learn & Play Baseball",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandlot Wisdom - Learn & Play Baseball",
    description: "Interactive baseball learning and game tracking app for parents and kids.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sandlot Wisdom",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#047857" }, // Emerald 700
    { media: "(prefers-color-scheme: dark)", color: "#064e3b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeWrapper>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {children}
            <ThemeSwitcher />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
