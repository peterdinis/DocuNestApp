"use client";

import useFolderDetail from "@/app/_hooks/folders/useFolderDetail";
import useUpdateFolder from "@/app/_hooks/folders/useUpdateFolder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FC, useEffect, useState } from "react";

const FolderInfo: FC = () => {
	const { id } = useParams<{ id: string }>();
	const parsedId = Number(id);
	const [isEditMode, setIsEditMode] = useState(false);
	const [name, setName] = useState("");
	const [pages, setPages] = useState(1);

	const { data, isLoading, isError } = useFolderDetail({
		id: parsedId,
		isEditMode,
	});

	useEffect(() => {
		if (data) {
			setName(data.name);
			setPages(Math.ceil((data.documents?.length ?? 0) / 10));
		}
	}, [data]);

	const updateFolderMut = useUpdateFolder({ id, setIsEditMode, setName });

	const handleSave = () => {
		updateFolderMut.mutate({ name });
	};

	if (isLoading) {
		return <Loader2 className="animate-spin w-8 h-8" />;
	}

	if (isError) {
		return (
			<p className="text-xl font-bold text-red-700">Something went wrong</p>
		);
	}

	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
	};

	return (
		<div>
			<h2 className="prose-h2: prose mt-5 flex justify-center align-top text-3xl dark:text-white">
				Folder Info
			</h2>
			<div className="ml-4 mt-6 flex justify-center">
				<Button>
					<Link href="/folders/all">Go Back</Link>
				</Button>
				<Button onClick={handleEditToggle} className="ml-4">
					{isEditMode ? "Cancel Edit" : "Enable Edit"}
				</Button>
			</div>
			<hr className="mt-3" />
			<div className="ml-5 mt-5">
				<form>
					<Input
						placeholder="Input name"
						value={data.name}
						className="max-w-[300px]"
						disabled={!isEditMode}
						onChange={(e) => setName(e.target.value)}
					/>
					{isEditMode && (
						<Button onClick={handleSave} className="mt-4">
							Save document
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default FolderInfo;
