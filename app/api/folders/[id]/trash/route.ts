import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	const { folderId } = await request.json();

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const findOneFolder = await db.folder.findFirst({
		where: { id: folderId },
	});

	if (!findOneFolder) {
		console.log(`Folder with ID ${folderId} not found`);
		return NextResponse.json({ error: "Folder not found" }, { status: 404 });
	}

	await db.folder.update({
		where: {
			id: findOneFolder!.id,
			userId: session.user.id,
		},
		data: {
			inTrash: true,
		},
	});

	return new NextResponse("Move to trash", { status: 200 });
}
