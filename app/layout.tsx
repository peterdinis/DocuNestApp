import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./_components/providers/ThemeProvider";
import Navigation from "./_components/shared/Navigation";
import { Room } from "./_components/liveblocks/Room";

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
		<html suppressHydrationWarning lang="en">
			<body className={`antialiased`}>
				<ClerkProvider>
					<ThemeProvider>
						<Room>
							<Navigation />
							{children}
							<Toaster />
						</Room>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
