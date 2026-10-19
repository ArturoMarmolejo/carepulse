import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import {ThemeProvider} from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
