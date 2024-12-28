"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
	const { toast } = useToast();
	const router = useRouter();

	const toggleMenu = () => setIsOpen(!isOpen);

	const logoutUser = async () => {
		toast({
			title: "Logout Successful",
			duration: 2000,
			className: "bg-green-800 text-white font-bold",
		});
		router.push("/login");
	};

	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	console.log("U", user);

	return (
		<nav className="bg-background shadow-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex-shrink-0">
					<span className="text-2xl font-bold text-primary">DocuNestApp</span>
				</Link>

				<div className="hidden md:flex items-center space-x-4">
					<AuthButton href="/register" label="Register" />
					<AuthButton href="/login" label="Login" />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative ml-3">
								<span className="sr-only">Open user menu</span>
								<User className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/dashboard">Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={logoutUser}>Sign out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
					<AuthButton href="/register" label="Register" />
					<AuthButton href="/login" label="Login" />
					<div className="mt-5">
						<ThemeButton />
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
