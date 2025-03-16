"use client";

import {
	type UpdateDocumentData,
	updateDocument,
} from "@/app/_store/mutations/documentMutations";
import { queryClient } from "@/app/_store/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateDocument = (id: string) => {
	const router = useRouter();

	return useMutation({
		mutationKey: ["updateDocument", id],
		mutationFn: (data: UpdateDocumentData) => updateDocument(id, data),
		onSuccess: () => {
			toast.success("Document was edited");
			queryClient.invalidateQueries({ queryKey: ["docDetail", id] });
			router.push("/dashboard");
		},
		onError: () => {
			toast.error("Document was not edited");
		},
	});
};
