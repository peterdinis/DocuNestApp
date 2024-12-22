import type { FC } from "react";
import Header from "../shared/Header";
import DashboardStatus from "./DashboardStatus";
import DashboardActivites from "./DashboardActivites";

const DashboardContent: FC = () => {

	return (
		<div>
			<main className="flex-1 overflow-auto p-8">
				<div className="mx-auto max-w-4xl">
					<Header text={`Welcome User`} />
					<br />
					<DashboardStatus />
					<div className="mt-3">
						<DashboardActivites />
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardContent;