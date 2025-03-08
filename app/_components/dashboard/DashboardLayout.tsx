"use client"

import { FC, ReactNode } from "react";
import Link from "next/link";
import { FileText, FolderOpen, Home, Search, Settings, Star, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DashboardLayoutProps = {
    children?: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
    children
}: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <FileText className="h-6 w-6" />
                    <span>DocManager</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <form className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search documents..."
                            className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
                        />
                    </form>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                            <img className="aspect-square h-full w-full" src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                        </span>
                    </Button>
                </div>
            </header>
            <div className="flex flex-1">
                <aside className="hidden w-[250px] flex-col border-r bg-muted/40 md:flex">
                    <nav className="grid gap-2 p-4 text-sm">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link href="/dashboard/documents" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                            <FileText className="h-4 w-4" />
                            All Documents
                        </Link>
                        <Link href="/dashboard/folders" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                            <FolderOpen className="h-4 w-4" />
                            Folders
                        </Link>
                        <Link href="/dashboard/starred" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                            <Star className="h-4 w-4" />
                            Starred
                        </Link>
                        <Link href="/dashboard/trash" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                            <Trash className="h-4 w-4" />
                            Trash
                        </Link>
                    </nav>
                    <div className="mt-auto p-4">
                        <h3 className="mb-2 text-xs font-medium">Storage</h3>
                        <div className="mb-2 h-2 rounded-full bg-muted">
                            <div className="h-full w-[24%] rounded-full bg-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">2.4 GB of 10 GB used</p>
                    </div>
                </aside>
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout