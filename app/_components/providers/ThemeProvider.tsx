"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	return (
		<NextThemesProvider attribute="class" {...props}>
			{children}
		</NextThemesProvider>
	);
};

export default ThemeProvider;
