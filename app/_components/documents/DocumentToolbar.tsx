"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "lucide-react";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import { FaFileWord } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

interface DocToolbarProps {
	isEditMode: boolean;
	handleEditToggle: () => void;
	handleDownload: () => void;
	handleExportPDF: () => void;
	folderSelectOrName: ReactNode;
	handleDocxDownload: () => void;
}

const DocToolbar: FC<DocToolbarProps> = ({
	isEditMode,
	handleEditToggle,
	handleDownload,
	folderSelectOrName,
	handleExportPDF,
	handleDocxDownload,
}) => {
	return (
		<div className="ml-8 mt-6 flex justify-center items-center">
			<Button variant="default">
				<Link href="/dashboard">Go Back</Link>
			</Button>
			<Button variant="default" onClick={handleEditToggle} className="ml-4">
				{isEditMode ? "Cancel Edit" : "Enable Edit"}
			</Button>
			<div className="ml-8">{folderSelectOrName}</div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button className="ml-5" variant="link">
						Download as
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={handleDownload}>
						<div className="flex items-center">
							<Text className="mr-2" /> Text File
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleExportPDF}>
						<div className="flex items-center">
							<FaRegFilePdf className="mr-2" /> PDF File
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleDocxDownload}>
						<div className="flex items-center">
							<FaFileWord className="mr-2" /> Word File
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default DocToolbar;
