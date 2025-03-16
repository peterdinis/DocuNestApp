"use client";

import {
	type ICreateDocumentData,
	createNewDocument,
} from "@/app/_store/mutations/documentMutations";
import { queryClient } from "@/app/_store/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateDocument = () => {
	return useMutation({
		mutationKey: ["newDocument"],
		mutationFn: async (data: ICreateDocumentData) => {
			return await createNewDocument(data);
		},
		onSuccess: () => {
			toast.success("New document was created");
			queryClient.invalidateQueries({
				queryKey: ["myPaginatedDocuments"],
			});
		},
		onError: () => {
			toast.error("Failed to create document");
		},
	});
};

export default useCreateDocument;
