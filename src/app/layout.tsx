import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { DEFAULT_COLOR_THEME } from "@/lib/theme";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js AI Starter — Design System Gallery",
  description:
    "Token-driven shadcn design system gallery for the Next.js AI Starter portfolio project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_COLOR_THEME}
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
