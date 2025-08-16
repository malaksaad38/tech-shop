import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import IndependenceDayHeader from "@/components/header";
import IndependenceDayFooter from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PakShop | Celebrate Independence Day 🇵🇰",
  description:
    "PakShop — A special Independence Day project showcasing products, offers, and a learning journey in Next.js and Tailwind CSS. 🎉",
  keywords: [
    "PakShop",
    "Independence Day Pakistan",
    "14 August",
    "Next.js Project",
    "Tailwind CSS",
    "Learning Project",
  ],
  authors: [{name: "PakShop Team"}],
  openGraph: {
    title: "PakShop | Celebrate Independence Day 🇵🇰",
    description:
      "Explore PakShop — A fun learning project built with Next.js to celebrate Pakistan's Independence Day.",
    url: "https://your-domain.com", // 👈 replace with your real domain
    siteName: "PakShop",
    images: [
      {
        url: "https://your-domain.com/og-image.png", // 👈 add an OG image
        width: 1200,
        height: 630,
        alt: "PakShop Independence Day",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
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
    <IndependenceDayHeader/>
    {children}
    <IndependenceDayFooter/>
    </body>
    </html>
  );
}
