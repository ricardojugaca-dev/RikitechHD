import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ConsentWrapper from "@/components/ConsentWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rikitech-hd.vercel.app"),

  title: {
    default: "RIKITECHHD - Software, Drivers & Technology",
    template: "%s | RIKITECHHD",
  },

  description:
    "RIKITECHHD is a technology website offering software, drivers, tutorials and useful resources for Windows users.",

  applicationName: "RIKITECHHD",

  openGraph: {
    title: "RIKITECHHD - Software, Drivers & Technology",
    description:
      "Software, drivers, tutorials and useful technology resources.",
    siteName: "RIKITECHHD",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RIKITECHHD - Software, Drivers & Technology",
    description:
      "Software, drivers, tutorials and useful technology resources.",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <ConsentWrapper>
          <ThemeProvider>
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </ConsentWrapper>
      </body>
    </html>
  );
}