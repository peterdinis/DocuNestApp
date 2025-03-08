import { NextPage } from "next";
import DashboardLayout from "../_components/dashboard/DashboardLayout";
import Link from "next/link"
import { ArrowUpRight, FileText, FolderPlus, Plus, Search, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../_components/dashboard/DashboardHeader";
import { DashboardShell } from "../_components/dashboard/DashboardShell";
import { RecentDocuments } from "../_components/dashboard/RecentDocuments";

const DashboardPage: NextPage = () => {
    return (
        <DashboardLayout>
            <DashboardShell>
                <DashboardHeader heading="Dashboard" text="Manage your documents and folders.">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                        </Button>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            New Document
                        </Button>
                    </div>
                </DashboardHeader>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">142</div>
                            <p className="text-xs text-muted-foreground">+12 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
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
                            <CardTitle className="text-sm font-medium">Shared Documents</CardTitle>
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
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+3 new folders</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Documents</CardTitle>
                            <CardDescription>
                                You have accessed{" "}
                                <Link href="/documents" className="text-primary underline-offset-4 hover:underline">
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
                                See all documents
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Manage your documents and folders with these quick actions.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Create Document</p>
                                        <p className="text-xs text-muted-foreground">Create a new document from scratch</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Plus className="h-5 w-5" />
                                    <span className="sr-only">Create document</span>
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-muted-foreground" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Upload Files</p>
                                        <p className="text-xs text-muted-foreground">Upload documents from your device</p>
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
                                        <p className="text-xs text-muted-foreground">Organize your documents in folders</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <FolderPlus className="h-5 w-5" />
                                    <span className="sr-only">Create folder</span>
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center gap-2">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Advanced Search</p>
                                        <p className="text-xs text-muted-foreground">Find documents with advanced filters</p>
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
    )
}

export default DashboardPage