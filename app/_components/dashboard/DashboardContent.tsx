import { FC } from "react";
import Header from "../shared/Header";
import { format } from "date-fns";
import AllDocuments from "../documents/AllDocuments";

const DashboardContent: FC = () => {
    const actualDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    return (
        <main className="flex-1 overflow-auto p-8">
            <div className="mx-auto max-w-4xl">
                <Header text="Hi user" />
                <span className="prose-p: prose mt-10 dark:text-sky-50">
                    Actual date and time: {actualDateTime}
                </span>
            </div>
            <div className="flex mt-20 justify-center items-center">
                <AllDocuments />
            </div>
        </main>
    )
}

export default DashboardContent