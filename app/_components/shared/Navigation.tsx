"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";

const Navigation: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav className="bg-background shadow-md">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Link
							href={"/"}
							className="flex-shrink-0"
						>
							<span className="text-2xl font-bold text-primary">DocuNest</span>
						</Link>
					</div>

					<div className="md:hidden">
						<Button variant="ghost" onClick={toggleMenu} size="icon">
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;