"use client"

import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import { FileText, FolderOpen, Home, Menu, Search, Settings, Star, Trash, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type DashboardLayoutProps = {
    children?: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
    children
}: DashboardLayoutProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <FileText className="h-6 w-6" />
                    <span>DocuNest</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <form className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search documents..."
                            className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
                        />
                    </form>
                    <Button variant="ghost" size="icon">
                        <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </span>
                    </Button>
                </div>
            </header>
            <div className="flex flex-1">
                <div
                    className={`fixed inset-0 z-20 bg-background/80 backdrop-blur-sm transition-all duration-200 md:hidden ${isMobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                    onClick={() => setIsMobileNavOpen(false)}
                />

                <aside
                    className={`fixed inset-y-0 left-0 z-30 w-[250px] flex-col border-r bg-muted/40 transition-transform duration-300 md:static md:flex md:translate-x-0 ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex h-16 items-center justify-between border-b px-4 md:hidden">
                        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                            <FileText className="h-6 w-6" />
                            <span>DocuNest</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>
                    <nav className="grid gap-2 p-4 text-sm">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/documents"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <FileText className="h-4 w-4" />
                            All Documents
                        </Link>
                        <Link
                            href="/dashboard/folders"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <FolderOpen className="h-4 w-4" />
                            Folders
                        </Link>
                        <Link
                            href="/dashboard/starred"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <Star className="h-4 w-4" />
                            Starred
                        </Link>
                        <Link
                            href="/dashboard/trash"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
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
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout