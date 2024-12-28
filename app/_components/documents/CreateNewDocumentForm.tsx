import type { FC } from "react";
import Header from "../shared/Header";

const CreateNewDocumentForm: FC = () => {
    return (
        <div className="flex justify-center items-center">
           <div className="mt-10">
                <Header text="Create new document" />
           </div>

        </div>
    )
}

export default CreateNewDocumentForm