import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { FC } from "react"
import AIDoc from "./AIDoc"

const AiDocSheet: FC = () => {
    return (
        <Sheet>
          <SheetTrigger>Use AI</SheetTrigger>
          <SheetContent>
                <AIDoc onContentGenerated={function (content: string): void {
                    throw new Error("Function not implemented.")
                } } />
          </SheetContent>
        </Sheet>
    )
}

export default AiDocSheet