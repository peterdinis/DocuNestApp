"use client";

import { createDocument } from "@/app/_actions/roomActions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlusIcon, HomeIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/app/_hooks/use-toast";

const navItems = [
	{ icon: HomeIcon, label: "Home", href: "/dashboard" },
];

const Sidebar: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const {toast} = useToast();
	const { user } = useUser(); // Use `useUser` at the top level

	// Updated `handleCreateDocument` function to use `user` directly
	const handleCreateDocument = async () => {
		if (!user) {
			// Ensure user is logged in, otherwise redirect to sign-in
			return router.push("/sign-in");
		}

		const email = user.emailAddresses[0]?.emailAddress;

		if (!email) {
			// If no email, ensure there's an error or redirect
			toast({
				title: "Email is required",
				duration: 2000,
				className: "bg-red-800 text-white font-bold text-xl"
			})
		}

		try {
			// Call `createDocument` function with user details
			const newDocument = await createDocument({
				userId: user.id,
				email,
			});

			if (newDocument) {
				// Redirect to the newly created document's page
				router.push(`/documents/${newDocument.id}`);
			} else {
				// Handle failure (optional)
				alert("Failed to create document.");
			}
		} catch (error) {
			// Handle errors from `createDocument`
			console.error("Error creating document:", error);
			alert("An error occurred while creating the document.");
		}
	};

	return (
		<>
			<div className="flex h-screen">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							size="icon"
							variant={"ghost"}
							className="fixed z-40 bg-transparent lg:hidden"
						>
							<MenuIcon className="h-4 w-4" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[240px] p-0">
						<div className="h-full py-6">
							<div className="h-[calc(100vh-5rem)] px-2">
								<nav className="space-y-1">
									{navItems.map((item, index) => (
										<Link
											key={index}
											href={item.href}
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
										>
											<item.icon className="h-4 w-4" />
											{item.label}
										</Link>
									))}
									<button
										onClick={handleCreateDocument}
										className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
									>
										<CirclePlusIcon className="h-4 w-4" />
										Create new document
									</button>
								</nav>
							</div>
						</div>
					</SheetContent>
				</Sheet>

				<aside className="hidden w-[240px] border-r lg:block">
					<div className="h-full py-6">
						<div className="h-[calc(100vh-5rem)] px-2">
							<nav className="space-y-1">
								{navItems.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
									>
										<item.icon className="h-4 w-4" />
										{item.label}
									</Link>
								))}
								<button
									onClick={handleCreateDocument}
									className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
								>
									<CirclePlusIcon className="h-4 w-4" />
									Create new document
								</button>
							</nav>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
};

export default Sidebar;
