"use client";

import { fetchAllTrashDocuments } from "@/app/_store/queries/documentQueries";
import { useQuery } from "@tanstack/react-query";

const useAllTrashDocuments = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["trashDocuments", page],
		queryFn: () => fetchAllTrashDocuments(page, limit),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useAllTrashDocuments;
