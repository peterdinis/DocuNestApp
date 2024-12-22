import type { FC } from "react";
import Header from "../shared/Header";
import DashboardStatus from "./DashboardStatus";

const DashboardContent: FC = () => {

	return (
		<div>
			<main className="flex-1 overflow-auto p-8">
				<div className="mx-auto max-w-4xl">
					<Header text={`Welcome User`} />
					<br />
					<DashboardStatus />
					<div className="mt-3">
						Activites later
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardContent;