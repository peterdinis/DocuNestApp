"use client";

import {
	type ICreateFolder,
	createNewFolder,
} from "@/app/_store/mutations/folderMutations";
import { queryClient } from "@/app/_store/queryClient";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type FC, type ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type FolderData, schema } from "./foldersSchema";

interface ICreateFolderModalProps {
	btnName: ReactNode;
}

const CreateFolderModal: FC<ICreateFolderModalProps> = ({ btnName }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		watch,
	} = useForm<FolderData>({
		resolver: zodResolver(schema),
	});

	const createFolderMut = useMutation({
		mutationKey: ["createFolder"],
		mutationFn: async (data: ICreateFolder) => {
			await createNewFolder(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["myPaginatedFolders"],
			});
			toast.success("Folder was created");
			reset();
		},
		onError: () => {
			toast.error("Error creating folder");
		},
	});

	const handleCreateFolder = (data: ICreateFolder) => {
		createFolderMut.mutate(data);
	};

	const folderName = watch("name");

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isDirty && (folderName ?? "").trim().length > 0) {
				event.preventDefault();
				event.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [isDirty, folderName]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{btnName}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new folder</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(handleCreateFolder)}>
					<Input placeholder="Folder Name" {...register("name")} />
					{errors.name && (
						<span className="text-red-500">
							{errors.name.message as unknown as ReactNode}
						</span>
					)}
					<DialogFooter className="mt-5">
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateFolderModal;
