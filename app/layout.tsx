import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/shared/Navigation";
import { Toaster } from "@/components/ui/toaster";
import AppClerkProvider from "./components/shared/providers/AppClerkProvider";

export const metadata: Metadata = {
  title: "DocuNest",
  description: "Application for team document collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppClerkProvider>
          <Navigation />
          {children}
          <Toaster />
        </AppClerkProvider>
      </body>
    </html>
  );
}
