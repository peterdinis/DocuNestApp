"use client";

import { useAuthState } from "@/app/_hooks/auth/useAuthState";
import { SignupSchema } from "@/app/_schemas/authSchemas";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const router = useRouter();
	const { loading, setLoading, resetState } = useAuthState();
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
		try {
			await signUp.email(
				{
					name: values.name,
					email: values.email,
					password: values.password,
				},
				{
					onResponse: () => {
						setLoading(false);
					},
					onRequest: () => {
						resetState();
						setLoading(true);
					},
					onSuccess: () => {
						toast("User was created", {
							className: "bg-green-800 text-white font-bold text-xl",
						});
						router.replace("/sign-in");
					},
				},
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Register</CardTitle>
					<CardDescription>
						Enter your email below to register an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												type="text"
												placeholder="John"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												type="email"
												placeholder="example@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													disabled={loading}
													type={showPassword ? "text" : "password"}
													placeholder="********"
													{...field}
												/>
												<button
													type="button"
													className="absolute inset-y-0 right-3 flex items-center"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<EyeOff size={18} />
													) : (
														<Eye size={18} />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={loading} type="submit" className="w-full">
								Submit
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
