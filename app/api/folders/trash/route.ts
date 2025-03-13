import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth-client";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await auth.api.getSession({ headers: request.headers }); 
	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const url = new URL(request.url);
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const pageSize = 10;

	const allUsersPaginatedFoldersInTrash = await db.folder.findMany({
		where: {
			userId: session.user.id,
			inTrash: true,
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const totalFoldersInTrash = await db.folder.count({
		where: {
			userId: session.user.id,
		},
	});

	if (!allUsersPaginatedFoldersInTrash) {
		throw new Error("User does not move any folders to trash");
	}

	return NextResponse.json({
		documents: allUsersPaginatedFoldersInTrash,
		totalPages: Math.ceil(totalFoldersInTrash / pageSize),
	});
}
