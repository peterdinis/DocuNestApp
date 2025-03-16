"use client";

import { fetchAllPaginatedDocuments } from "@/app/_store/queries/documentQueries";
import { useQuery } from "@tanstack/react-query";

type IPagination = {
	query: string;
	page: number;
};

const usePaginatedDocuments = ({ query, page }: IPagination) => {
	return useQuery({
		queryKey: ["myPaginatedDocuments", query, page],
		queryFn: () => fetchAllPaginatedDocuments({ query, page }),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default usePaginatedDocuments;
