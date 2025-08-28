import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import IndependenceDayHeader from "@/components/header";
import IndependenceDayFooter from "@/components/footer";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechShop",
  description:
    "TechShop — An online project showcasing products, offers, and a learning journey in Next.js and Tailwind CSS.",
  keywords: [
    "TechShop",
    "E-commerce",
    "Next.js Project",
    "Tailwind CSS",
    "Learning Project",
  ],
  authors: [{name: "TechShop Team"}],
  openGraph: {
    title: "TechShop",
    description:
      "Explore TechShop — A fun learning project built with Next.js and Tailwind CSS.",
    url: "https://tech-shop-01.vercel.app/", // 👈 replace with your real domain
    siteName: "TechShop",
    images: [
      {
        url: "https://tech-shop-01.vercel.app//og-image.png", // 👈 create an OG image
        width: 1200,
        height: 630,
        alt: "TechShop",
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <IndependenceDayHeader/>
      {children}
      <IndependenceDayFooter/>
    </ThemeProvider>
    </body>
    </html>
  );
}
