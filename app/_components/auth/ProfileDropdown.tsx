"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";

const ProfileDropdown: FC = () => {
	const session = useSession();
	const router = useRouter();

	const logout = () => {
		signOut();
		toast("Successfull logout", {
			className: "bg-green-800 text-white font-bold text-xl",
		});
		router.push("/sign-in");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={session.data?.user.image!} />
					<AvatarFallback>
						<User2 className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>{session.data?.user.email}</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
