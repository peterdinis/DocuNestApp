import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./_components/providers/ThemeProvider";

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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
