"use client";

import {
	type IMoveToTrash,
	moveToTrashFolder,
} from "@/app/_store/mutations/folderMutations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMoveFolderToTrash = () => {
	return useMutation({
		mutationKey: ["moveFolderToTrash"],
		mutationFn: (data: IMoveToTrash) => moveToTrashFolder(data),
		onSuccess: () => {
			toast.success("Folder was added to trash");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Folder was not added to trash");
		},
	});
};
