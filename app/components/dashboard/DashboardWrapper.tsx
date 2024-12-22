"use client";

import type { FC } from "react";
import Sidebar from "../shared/Sidebar";

const DashboardWrapper: FC = () => {
	return (
		<div className="dark:bg-dark dark:text-light flex min-h-screen">
			<Sidebar />
			<div className="flex-1 overflow-auto">
				AAAAA
			</div>
		</div>
	);
};

export default DashboardWrapper;