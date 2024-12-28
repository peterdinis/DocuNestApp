import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "./_components/liveblocks/Provider";
import ThemeProvider from "./_components/providers/ThemeProvider";
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
		<html suppressHydrationWarning lang="en">
			<body className={`antialiased`}>
				<ClerkProvider>
					<ThemeProvider>
						<Provider>
							<Navigation />
							{children}
							<Toaster />
						</Provider>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
