"use client";

import { moveDocumentToTrash } from "@/app/_store/mutations/documentMutations";
import type { IMoveToTrash } from "@/app/_store/mutations/folderMutations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMoveDocumentToTrash = () => {
	return useMutation({
		mutationKey: ["moveDocToTrash"],
		mutationFn: (data: IMoveToTrash) => moveDocumentToTrash(data),
		onSuccess: () => {
			toast.success("Document was added to trash");
		},
		onError: (error) => {
			console.log("E", error);
			toast.error("Document was not added to trash");
		},
	});
};
