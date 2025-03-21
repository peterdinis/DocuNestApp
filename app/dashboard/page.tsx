"use client";

import {
	ArrowUpRight,
	FileText,
	FolderPlus,
	Plus,
	Search,
	Upload,
	Users,
} from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";
import DashboardLayout from "../_components/dashboard/DashboardLayout";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { DashboardHeader } from "../_components/dashboard/DashboardHeader";
import { DashboardShell } from "../_components/dashboard/DashboardShell";
import { RecentDocuments } from "../_components/dashboard/RecentDocuments";
import CreateFolderModal from "../_components/folders/CreateFolderModal";
import useFolders from "../_hooks/folders/useFolders";

const DashboardPage: NextPage = () => {
	const { data: folderData } = useFolders();

	const countedFolderData = useMemo(() => {
		const mappedFolders = (folderData ?? []).map((item: any) => item);
		return mappedFolders.length;
	}, [folderData]);

	return (
		<DashboardLayout>
			<DashboardShell>
				<DashboardHeader
					heading="Dashboard"
					text="Manage your documents and folders."
				>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Upload className="mr-2 h-4 w-4" />
							Upload
						</Button>
						<Button size="sm">
							<Plus className="mr-2 h-4 w-4" />
							<Link href="/documents/new">New Document</Link>
						</Button>
					</div>
				</DashboardHeader>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Documents
							</CardTitle>
							<FileText className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">142</div>
							<p className="text-xs text-muted-foreground">
								+12 from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Storage Used
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">2.4 GB</div>
							<p className="text-xs text-muted-foreground">of 10 GB (24%)</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Shared Documents
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">36</div>
							<p className="text-xs text-muted-foreground">+2 from last week</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Folders</CardTitle>
							<FolderPlus className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{countedFolderData}</div>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card className="col-span-4">
						<CardHeader>
							<CardTitle>Recent Documents</CardTitle>
							<CardDescription>
								You have accessed{" "}
								<Link
									href="/documents"
									className="text-primary underline-offset-4 hover:underline"
								>
									24 documents
								</Link>{" "}
								in the last 30 days.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentDocuments />
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								<ArrowUpRight className="mr-2 h-4 w-4" />
								<Link href="/documents">See all documents</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="col-span-3">
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>
								Manage your documents and folders with these quick actions.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-2">
							<div className="flex items-center justify-between rounded-md border p-3">
								<div className="flex items-center gap-2">
									<FileText className="h-5 w-5 text-muted-foreground" />
									<div className="space-y-0.5">
										<p className="text-sm font-medium">
											<Link href="/documents/new">Create Document</Link>
										</p>
										<p className="text-xs text-muted-foreground">
											Create a new document from scratch
										</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<Link href="/documents/new"><Plus className="h-5 w-5" /></Link>
									<span className="sr-only">Create document</span>
								</Button>
							</div>
							<div className="flex items-center justify-between rounded-md border p-3">
								<div className="flex items-center gap-2">
									<Upload className="h-5 w-5 text-muted-foreground" />
									<div className="space-y-0.5">
										<p className="text-sm font-medium">Upload Files</p>
										<p className="text-xs text-muted-foreground">
											Upload documents from your device
										</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<Upload className="h-5 w-5" />
									<span className="sr-only">Upload files</span>
								</Button>
							</div>
							<div className="flex items-center justify-between rounded-md border p-3">
								<div className="flex items-center gap-2">
									<FolderPlus className="h-5 w-5 text-muted-foreground" />
									<div className="space-y-0.5">
										<p className="text-sm font-medium">Create Folder</p>
										<p className="text-xs text-muted-foreground">
											Organize your documents in folders
										</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<CreateFolderModal
										btnName={<FolderPlus className="h-5 w-5" />}
									/>
								</Button>
							</div>
							<div className="flex items-center justify-between rounded-md border p-3">
								<div className="flex items-center gap-2">
									<Search className="h-5 w-5 text-muted-foreground" />
									<div className="space-y-0.5">
										<p className="text-sm font-medium">Advanced Search</p>
										<p className="text-xs text-muted-foreground">
											Find documents with advanced filters
										</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<Search className="h-5 w-5" />
									<span className="sr-only">Advanced search</span>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</DashboardShell>
		</DashboardLayout>
	);
};

export default DashboardPage;
