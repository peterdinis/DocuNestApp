"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import ThemeButton from "./ThemeButton";

const AuthButton = ({ href, label }: { href: string; label: string }) => (
	<Button
		variant="outline"
		className="prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-white"
	>
		<Link href={href} className="dark:text-white">
			{label}
		</Link>
	</Button>
);

const Navigation: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const { user } = useUser();

	return (
		<nav className="bg-background shadow-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex-shrink-0">
					<span className="text-2xl font-bold text-primary">DocuNestApp</span>
				</Link>

				<div className="hidden md:flex items-center space-x-4">
					{user ? (
						<UserButton />
					) : (
						<>
							<AuthButton href="/sign-up" label="Register" />
							<AuthButton href="/sign-in" label="Login" />
						</>
					)}
					<ThemeButton />
				</div>

				<div className="md:hidden">
					<Button variant="ghost" onClick={toggleMenu} size="icon">
						<span className="sr-only">Open main menu</span>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</Button>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden space-y-1 px-2 pb-3 pt-2 sm:px-3">
					{user ? (
						<UserButton />
					) : (
						<>
							<AuthButton href="/sign-up" label="Register" />
							<AuthButton href="/sign-in" label="Login" />
						</>
					)}
					<div className="mt-5">
						<ThemeButton />
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
