"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowUpDown,
	FileArchive,
	FileImage,
	FilePenLine,
	FileText,
	MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Document type definition
type Document = {
	id: string;
	name: string;
	type: "doc" | "pdf" | "image" | "archive";
	size: string;
	modified: string;
	status: "shared" | "private" | "draft";
};

// Sample data
const documents: Document[] = [
	{
		id: "doc-1",
		name: "Project Proposal",
		type: "doc",
		size: "2.4 MB",
		modified: "2 hours ago",
		status: "shared",
	},
	{
		id: "doc-2",
		name: "Financial Report Q1",
		type: "pdf",
		size: "4.2 MB",
		modified: "Yesterday",
		status: "private",
	},
	{
		id: "doc-3",
		name: "Marketing Assets",
		type: "image",
		size: "12.8 MB",
		modified: "3 days ago",
		status: "shared",
	},
	{
		id: "doc-4",
		name: "Client Contracts",
		type: "archive",
		size: "8.1 MB",
		modified: "1 week ago",
		status: "private",
	},
	{
		id: "doc-5",
		name: "Meeting Notes",
		type: "doc",
		size: "1.2 MB",
		modified: "2 days ago",
		status: "draft",
	},
];

// Helper function to get icon based on document type
const getDocumentIcon = (type: Document["type"]) => {
	switch (type) {
		case "doc":
			return <FileText className="h-4 w-4 text-blue-500" />;
		case "pdf":
			return <FilePenLine className="h-4 w-4 text-red-500" />;
		case "image":
			return <FileImage className="h-4 w-4 text-green-500" />;
		case "archive":
			return <FileArchive className="h-4 w-4 text-amber-500" />;
		default:
			return <FileText className="h-4 w-4" />;
	}
};

// Helper function to get badge variant based on status
const getStatusBadge = (status: Document["status"]) => {
	switch (status) {
		case "shared":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					Shared
				</Badge>
			);
		case "private":
			return (
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 border-blue-200"
				>
					Private
				</Badge>
			);
		case "draft":
			return (
				<Badge
					variant="outline"
					className="bg-amber-50 text-amber-700 border-amber-200"
				>
					Draft
				</Badge>
			);
		default:
			return <Badge variant="outline">Unknown</Badge>;
	}
};

export function RecentDocuments() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const columns: ColumnDef<Document>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Document
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const document = row.original;
				return (
					<div className="flex items-center gap-2">
						{getDocumentIcon(document.type)}
						<span className="font-medium">{document.name}</span>
					</div>
				);
			},
		},
		{
			accessorKey: "size",
			header: "Size",
		},
		{
			accessorKey: "modified",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Modified
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				return getStatusBadge(row.original.status);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const document = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(document.id)}
							>
								Copy document ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View document</DropdownMenuItem>
							<DropdownMenuItem>Edit document</DropdownMenuItem>
							<DropdownMenuItem>Share document</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-600">
								Delete document
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: documents,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No documents found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
