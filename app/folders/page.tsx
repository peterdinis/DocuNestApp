import type { NextPage } from "next";
import DashboardLayout from "../_components/dashboard/DashboardLayout";
import AllFoldersContent from "../_components/folders/AllFoldersContent";

const AllFoldersPage: NextPage = () => {
	return (
		<DashboardLayout>
			<AllFoldersContent />
		</DashboardLayout>
	);
};

export default AllFoldersPage;
