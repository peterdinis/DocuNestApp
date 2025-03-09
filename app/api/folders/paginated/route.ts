import { getSession } from "@/lib/auth-client";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await getSession();
	if (!session || !session.data?.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const url = new URL(request.url);
	const query = url.searchParams.get("query") || "";
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const pageSize = 10;

	const allUsersPaginatedFolders = await db.folder.findMany({
		where: {
			userId: session.data?.user.id,

			name: {
				contains: query,
				mode: "insensitive",
			},
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const totalFolders = await db.folder.count({
		where: {
			userId: session.data?.user.id,
			name: {
				contains: query,
				mode: "insensitive",
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
