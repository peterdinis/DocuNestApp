import { FC } from "react";
import Header from "../shared/Header";

const DashboardContent: FC = () => {
    return (
        <main className="flex-1 overflow-auto p-8">
            <div className="mx-auto max-w-4xl">
                <Header text="Hi user" />
            </div>
        </main>
    )
}

export default DashboardContent