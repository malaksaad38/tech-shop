import type {Metadata} from "next";
import {Geist, Geist_Mono, Noto_Nastaliq_Urdu} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import {AuthProvider} from "@/hooks/useAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {IntlProviderWrapper} from "@/providers/intl-provider-wrapper";
import {getMessages} from "next-intl/server";
import {getCheckedLocale} from "@/lib/server-utils";
import ClickSpark from "@/components/ClickSpark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"], // Urdu is part of Arabic subset
  variable: "--font-noto-nastaliq",
  weight: ["400", "500", "600", "700"], // available weights
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

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages();
  const {dir, locale} = await getCheckedLocale();
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${notoNastaliq.variable} antialiased`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <IntlProviderWrapper locale={locale} messages={messages}>
        <AuthProvider>
          <ClickSpark
            sparkColor="blue"
            sparkSize={10}
            sparkRadius={25}
            sparkCount={20}
            duration={500}
          >
            <Header/>
            {children}
            <Footer/>
          </ClickSpark>
        </AuthProvider>
      </IntlProviderWrapper>
    </ThemeProvider>
    </body>
    </html>
  );
}
