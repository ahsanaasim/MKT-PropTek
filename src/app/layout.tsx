import type { Metadata, Viewport } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import { ScreenStateProvider } from "@/providers/screen-state-provider";
import { StatePreviewFab } from "@/components/layout/state-preview-fab";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Josefin_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PropTek — Cleanup marketplace",
  description:
    "Post cleanup jobs, compare immersive bids, and pay with confidence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#FF385C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <ScreenStateProvider>
          {children}
          <StatePreviewFab />
          <Toaster />
        </ScreenStateProvider>
      </body>
    </html>
  );
}
