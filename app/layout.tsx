import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
