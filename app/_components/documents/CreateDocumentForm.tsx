"use client";

import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import useCreateDocument from "@/app/_hooks/docs/useCreateDocument";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

const CreateDocumentForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		setValue,
		watch,
	} = useForm({
		defaultValues: { title: "", description: "" },
	});

	const { mutate: createDocumentMut, isPending } = useCreateDocument();
	const router = useRouter();

	const onSubmit = (formData: { title: string; description: string }) => {
		createDocumentMut(formData);
		reset();
		router.push("/dashboard");
	};

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isDirty || watch("description") || watch("title")) {
				event.preventDefault();
				event.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [isDirty, watch]);

	const handleGoBack = () => {
		if (!isDirty && !watch("description") && !watch("title")) {
			router.push("/dashboard");
		} else if (confirm("Máte neuložené zmeny. Naozaj chcete odísť?")) {
			router.push("/dashboard");
		}
	};

	return (
		<div>
			<h2 className="mt-5 flex justify-center text-4xl">Nový dokument</h2>

			<p className="mt-5 text-center text-xl font-bold text-red-800">
				Nové dokumenty sú vždy zaradené do priečinka „Nepriradené dokumenty“.
			</p>

			<div className="mt-5 flex justify-center">
				<Button variant="outline">Použiť AI</Button>
				<Button variant="default" className="ml-5" onClick={handleGoBack}>
					Späť
				</Button>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-5 flex flex-col items-center w-full"
			>
				<input
					type="text"
					{...register("title", { required: "Názov je povinný" })}
					placeholder="Názov dokumentu"
					className="mb-2 w-3/4 border border-gray-300 p-2"
				/>
				{errors.title && (
					<span className="text-red-500">{errors.title.message}</span>
				)}

				<div className="mt-6 w-3/4">
					<Editor
						onChange={(content) => setValue("description", content)}
						initialContent={watch("description")}
					/>
				</div>

				{errors.description && (
					<span className="text-red-500">{errors.description.message}</span>
				)}

				<Button type="submit" className="mt-6" disabled={isPending}>
					{isPending ? (
						<Loader2 className="h-8 w-8 animate-spin" />
					) : (
						"Vytvoriť dokument"
					)}
				</Button>
			</form>
		</div>
	);
};

export default CreateDocumentForm;