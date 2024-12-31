"use client"

import type { FC } from "react";
import Header from "../shared/Header";
import { useUser } from '@clerk/nextjs'
import { useRouter } from "next/navigation";

const CreateNewDocumentForm: FC = () => {
	const {user} = useUser();
	const router = useRouter();

	if(!user) router.push("/sign-in");

	return (
		<div>
			<div className="flex justify-center items-center">
				<div className="mt-10">
					<Header text="Create new document" />
				</div>
			</div>
			<main className="flex w-full flex-col items-center mt-10">
			<CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
			</main>
		</div>
	);
};

export default CreateNewDocumentForm;
