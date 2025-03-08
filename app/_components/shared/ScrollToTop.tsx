"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-6 right-6 p-3 bg-fuchsia-600 text-white rounded-full shadow-lg transition-opacity ${
				isVisible ? "opacity-100" : "opacity-0"
			} hover:bg-fuchsia-700`}
			aria-label="Scroll to top"
		>
			<ArrowUp className="w-6 h-6" />
		</button>
	);
};

export default ScrollToTop;
