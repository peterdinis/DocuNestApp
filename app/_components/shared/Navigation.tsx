import { FC } from "react"
import { FileText, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
const Navigation: FC = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span className="text-xl font-bold">DocuNest</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                        Features
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                        Testimonials
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                        Pricing
                    </Link>
                    <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                        Login
                    </Link>
                    <Button>Get Started</Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                <SheetClose asChild>
                                    <Link
                                        href="#features"
                                        className="flex py-2 text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Features
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="#testimonials"
                                        className="flex py-2 text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Testimonials
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="#pricing"
                                        className="flex py-2 text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Pricing
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="#faq" className="flex py-2 text-sm font-medium transition-colors hover:text-primary">
                                        FAQ
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/login" className="flex py-2 text-sm font-medium transition-colors hover:text-primary">
                                        Login
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button className="mt-2">Get Started</Button>
                                </SheetClose>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navigation