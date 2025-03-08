import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import MouseMoveEffect from "./_components/shared/MouseMoveEffect";

export const metadata: Metadata = {
  title: "DocuNest",
  description: "Application for managing documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased`}
      >
        <body className={`bg-background text-foreground antialiased`}>
          <MouseMoveEffect />
          {children}
          <Toaster />
        </body>
      </body>
    </html>
  );
}
