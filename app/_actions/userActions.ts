"use server";

import { liveblocks } from "../_lib/liveblocks";
import { parseStringify } from "../_lib/utils";

export const getDocumentUsers = async ({
	roomId,
	currentUser,
	text,
}: { roomId: string; currentUser: string; text: string }) => {
	try {
		const room = await liveblocks.getRoom(roomId);

		const users = Object.keys(room.usersAccesses).filter(
			(email) => email !== currentUser,
		);

		if (text.length) {
			const lowerCaseText = text.toLowerCase();

			const filteredUsers = users.filter((email: string) =>
				email.toLowerCase().includes(lowerCaseText),
			);

			return parseStringify(filteredUsers);
		}

		return parseStringify(users);
	} catch (error) {
		console.log(`Error fetching document users: ${error}`);
	}
};
