import type { Metadata } from "next";
import "@/app/globals.css";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | NanoHelp",
    default: "NanoHelp — Connecting Nanotechnology to the World",
  },
  description:
    "Discover the people, research, opportunities, laboratories, companies, and technologies shaping the future of nanotechnology.",
  keywords: [
    "nanotechnology",
    "nanotech research",
    "nanomaterials",
    "nanomedicine",
    "nanoelectronics",
    "research opportunities",
    "funding",
    "careers",
  ],
  authors: [{ name: "NanoHelp" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "NanoHelp",
    title: "NanoHelp — Connecting Nanotechnology to the World",
    description:
      "Discover the people, research, opportunities, laboratories, companies, and technologies shaping the future of nanotechnology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NanoHelp — Connecting Nanotechnology to the World",
    description:
      "Discover the people, research, opportunities, laboratories, companies, and technologies shaping the future of nanotechnology.",
  },
  robots: {
    index: true,
    follow: true,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
