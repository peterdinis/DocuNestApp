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
}

async function CreateNewDocument(props: PageProps) {
  const { id } = await props.params;

  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect('/sign-in');
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  const room = await getDocument({
    roomId: id,
    userId: userEmail,
  });

  if (!room) {
    redirect('/');
  }

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users?.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write') 
      ? 'editor' 
      : 'viewer'
  }));

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