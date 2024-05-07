import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farcaster Network",
  description: "Analyze protocol-level trends across Farcaster",
  metadataBase: new URL("https://farcaster.network"),
  openGraph: {
    images: ["/sharing.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="farcaster.network" trackOutboundLinks />
      </head>

      <body className={mono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
