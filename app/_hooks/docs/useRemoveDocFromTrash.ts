"use client";

import { removeDocumentFromTrash } from "@/app/_store/mutations/documentMutations";
import type { IMoveToTrash } from "@/app/_store/mutations/folderMutations";
import { queryClient } from "@/app/_store/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveDocumentFromTrash = () => {
	return useMutation({
		mutationKey: ["removeDocFromTrash"],
		mutationFn: (data: IMoveToTrash) => removeDocumentFromTrash(data),
		onSuccess: () => {
			toast.success("Document was added to trash");
			queryClient.invalidateQueries({
				queryKey: ["trashDocuments"],
			});
		},
		onError: (error) => {
			console.log("E", error);
			toast.error("Document was not added to trash");
		},
	});
};
