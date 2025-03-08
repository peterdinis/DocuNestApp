import { FC } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

const Footer: FC = () => {
    return (
        <footer className="w-full border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <p className="text-sm font-medium">© {new Date().getFullYear()} DocuNest. All rights reserved.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Terms
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Privacy
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer