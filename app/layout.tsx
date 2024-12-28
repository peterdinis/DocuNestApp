import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./_components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster"
import Navigation from "./_components/shared/Navigation";

export const metadata: Metadata = {
  title: "DocuNestApp",
  description: "Application for live collboration with people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ClerkProvider>
        <ThemeProvider>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
