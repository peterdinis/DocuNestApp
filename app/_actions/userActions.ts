"use server";

import { clerkClient as getClerkClient } from "@clerk/nextjs/server";
import { liveblocks } from "../_lib/liveblocks";
import { parseStringify } from "../_lib/utils";


export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
	try {
	  const clerkClient = await getClerkClient();
  
	  const users = await Promise.all(userIds.map(async (userId) => {
		const user = await clerkClient.users.getUser(userId);
		return {
		  id: user.id,
		  name: `${user.firstName} ${user.lastName}`,
		  email: user.emailAddresses[0].emailAddress,
		  avatar: user.imageUrl,
		};
	  }));
  
	  const sortedUsers = userIds.map((userId) =>
		users.find((user) => user.id === userId),
	  );
  
	  return parseStringify(sortedUsers);
	} catch (error) {
	  console.log(`Error fetching users: ${error}`);
	}
  };

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
