import { FC } from "react";
import Sidebar from "../shared/Sidebar";

const DashboardWrapper: FC = () => {
    return (
        <div className="dark:bg-dark dark:text-light flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                Content
            </div>
        </div>
    );
};

export default DashboardWrapper;