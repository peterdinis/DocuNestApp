import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import type { FC } from "react";

const AllDocuments: FC = () => {
	return (
		<Alert>
			<DownloadCloud className="h-4 w-4" />
			<AlertTitle>Document One</AlertTitle>
			<AlertDescription>
				rorororororoororororororororoor <br />
				<Button className="mt-5" variant={"link"}>
					Detail
				</Button>
			</AlertDescription>
		</Alert>
	);
};

export default AllDocuments;
