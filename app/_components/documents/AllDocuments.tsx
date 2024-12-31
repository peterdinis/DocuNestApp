"use client";

import useUserDocuments from "@/app/_hooks/use-user-documents";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { DownloadCloud, Ghost, Loader2 } from "lucide-react";
import type { FC } from "react";

const AllDocuments: FC = () => {
	const { user } = useUser();
	const emailAddress = user?.emailAddresses[0]?.emailAddress;
	const { documents, loading, error } = useUserDocuments(emailAddress);

	if (loading) {
		return <Loader2 className="animate-spin w-8 h-8" />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (documents.length === 0) {
		return (
			<div className="font-bold text-xl">
				<Ghost className="animate-bounce w-8 h-8" /> No documents found.
			</div>
		);
	}

	return (
		<>
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
		</>
	);
};

export default AllDocuments;
