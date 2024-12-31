import { getDocument } from "@/app/_actions/roomActions";
import { getClerkUsers } from "@/app/_actions/userActions";
import CollaborativeRoom from "@/app/_components/liveblocks/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface User {
  email: string;
  // Add other user properties as needed
}

async function CreateNewDocument(props: PageProps) {
  // Await the params first
  const { id } = await props.params;
  
  // Fetch the current user (if logged in)
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect('/sign-in');
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  // Fetch room/document data using the awaited id
  const room = await getDocument({
    roomId: id,
    userId: userEmail,
  });

  if (!room) {
    redirect('/');
  }

  // Get the user IDs from the room
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  // Map the users data with the user type based on room access
  const usersData = users?.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write') 
      ? 'editor' 
      : 'viewer'
  }));

  // Determine the current user's type based on room access
  const currentUserType = room.usersAccesses[userEmail]?.includes('room:write')
    ? 'editor'
    : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default CreateNewDocument;