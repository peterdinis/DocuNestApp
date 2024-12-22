import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/shared/Navigation";
import { Toaster } from "@/components/ui/toaster"

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
				<Navigation />
				{children}
				<Toaster />
			</body>
		</html>
	);
}
