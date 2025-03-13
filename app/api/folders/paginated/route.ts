import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const url = new URL(request.url);
	const query = url.searchParams.get("query") || "";
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const pageSize = 10;

	const allUsersPaginatedFolders = await db.folder.findMany({
		where: {
			userId: session.user.id,

			name: {
				contains: query,
			},
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const totalFolders = await db.folder.count({
		where: {
			userId: session.user.id,
			name: {
				contains: query,
			},
		},
	});

	if (!allUsersPaginatedFolders) {
		throw new Error("User does not create any folders");
	}

	return NextResponse.json({
		folders: allUsersPaginatedFolders,
		totalPages: Math.ceil(totalFolders / pageSize),
	});
}
