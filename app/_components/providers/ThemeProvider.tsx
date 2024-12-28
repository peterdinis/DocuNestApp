"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	return (
		<NextThemesProvider
			attribute="class"
			disableTransitionOnChange
			defaultTheme="system" // Ensure a default theme is provided
			enableSystem // Enable system preference syncing
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
};

export default ThemeProvider;
