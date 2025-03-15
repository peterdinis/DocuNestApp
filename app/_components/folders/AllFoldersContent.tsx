"use client";

import usePaginatedFolders from "@/app/_hooks/folders/usePaginatedFolders";
import { useDebounce } from "@/app/_hooks/shared/useDebounce";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Folder as DisplayFolder } from "@prisma/client";
import { motion } from "framer-motion";
import { Folder, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FC, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import DeleteFolder from "./DeleteFolderModal";

const AllFoldersContent: FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [folders, setFolders] = useState<DisplayFolder[]>([]);

	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	const { data, isLoading, isError, refetch } = usePaginatedFolders({
		query: debouncedSearchQuery,
		page: currentPage,
	});

	useEffect(() => {
		if (data?.folders) {
			setFolders(data.folders);
		}
	}, [data]);

	useEffect(() => {
		refetch();
	}, [debouncedSearchQuery, currentPage, refetch]);

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	if (isLoading) {
		return <Loader2 className="animate-spin w-8 h-8" />;
	}

	if (isError) {
		return (
			<p className="text-xl font-bold text-red-700">Something went wrong</p>
		);
	}

	return (
		<main className="ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4">
			<div className="flex justify-center align-top">
				<h2 className="text-4xl font-bold text-white flex justify-center items-center">
					My Folders
				</h2>
			</div>
			<Input
				className="mt-5"
				placeholder="Search..."
				value={searchQuery}
				onChange={handleSearchInputChange}
			/>
			{folders.length === 0 ? (
				<div className="mt-10 flex flex-col items-center">
					<Folder
						size={50}
						className="h-16 w-16 animate-bounce dark:text-white"
					/>
					<p className="mt-4 text-xl font-bold text-gray-700 dark:text-white">
						No folders found
					</p>
				</div>
			) : (
				<ReactSortable
					swap
					animation={200}
					list={folders}
					setList={setFolders}
					className="mt-5 flex flex-wrap gap-5"
				>
					{folders.map((item: DisplayFolder) => {
						return (
							<motion.div
								whileHover={{ scale: 1.1 }}
								key={item.id}
								className="w-[200px]"
							>
								<Card className="space-y-5 p-4">
									<div className="flex justify-center rounded-lg align-top">
										<Folder size={50} />
									</div>
									<div className="flex justify-center">
										<Button variant="default">
											<Link href={`/folders/${item.id}`}>{item.name}</Link>
										</Button>
									</div>

									<div>
										<DeleteFolder folderId={item.id} />
									</div>
								</Card>
							</motion.div>
						);
					})}
				</ReactSortable>
			)}
		</main>
	);
};

export default AllFoldersContent;
