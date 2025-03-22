import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { FC } from "react";
import AIDoc from "./AIDoc";

type AiDocSheetProps = {
    onContentGenerated: (content: string, extra?: any) => void;
};

const AiDocSheet: FC<AiDocSheetProps> = ({ onContentGenerated }) => {
    return (
        <Sheet>
            <SheetTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Use AI
            </SheetTrigger>
            <SheetContent>
                <AIDoc onContentGenerated={onContentGenerated} />
            </SheetContent>
        </Sheet>
    );
};

export default AiDocSheet;