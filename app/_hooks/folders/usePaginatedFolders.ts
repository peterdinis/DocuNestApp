"use client";

import { fetchAllPaginatedFolders } from "@/app/_store/queries/folderQueries";
import { useQuery } from "@tanstack/react-query";

type IPagination = {
	query: string;
	page: number;
};

const usePaginatedFolders = ({ query, page }: IPagination) => {
	return useQuery({
		queryKey: ["myPaginatedFolders", query, page],
		queryFn: () => fetchAllPaginatedFolders({ query, page }),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default usePaginatedFolders;
