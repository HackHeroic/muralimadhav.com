import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Solway } from "next/font/google";
import "./globals.css";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const solway = Solway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-solway",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  icons: {
    icon: "/madhav-charles-4.jpeg",
    shortcut: "/madhav-charles-4.jpeg",
    apple: "/madhav-charles-4.jpeg",
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- Primary Meta Tags --> */}
          <title>C. Murali Madhav</title>
          <meta name="title" content="C. Murali Madhav" />
          <meta name="description" content="Building AI-powered solutions and scalable systems. I love to learn, create, and ship. AI Engineer intern offer from Sanas. 8th place globally at HackMIT 2026. First-author IEEE paper published at IEEE APPEEC 2026. Experienced in full-stack development, machine learning, and deep learning." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://muralimadhav.com/" />
          <meta property="og:title" content="C. Murali Madhav" />
          <meta property="og:description" content="Building AI-powered solutions and scalable systems. I love to learn, create, and ship. AI Engineer intern offer from Sanas. 8th place globally at HackMIT 2026. First-author IEEE paper published at IEEE APPEEC 2026. Experienced in full-stack development, machine learning, and deep learning." />
          <meta property="og:image" content="https://muralimadhav.com/madhav-desert.jpeg" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://muralimadhav.com/" />
          <meta property="twitter:title" content="C. Murali Madhav" />
          <meta property="twitter:description" content="Building AI-powered solutions and scalable systems. I love to learn, create, and ship. AI Engineer intern offer from Sanas. 8th place globally at HackMIT 2026. First-author IEEE paper published at IEEE APPEEC 2026. Experienced in full-stack development, machine learning, and deep learning." />
          <meta property="twitter:image" content="https://muralimadhav.com/madhav-desert.jpeg" />

      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable,
          solway.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <BlueprintGrid />
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
