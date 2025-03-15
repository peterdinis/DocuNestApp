import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const url = new URL(request.url);
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const pageSize = 10;

	const allUsersPaginatedDocumentsInTrash = await db.document.findMany({
		where: {
			userId: session.user.id,
			inTrash: true,
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const totalDocumentsInTrash = await db.document.count({
		where: {
			userId: session.user.id,
		},
	});

	if (!allUsersPaginatedDocumentsInTrash) {
		throw new Error("User does not move any documents to trash");
	}

	return NextResponse.json({
		documents: allUsersPaginatedDocumentsInTrash,
		totalPages: Math.ceil(totalDocumentsInTrash / pageSize),
	});
}
