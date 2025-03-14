import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const url = new URL(request.url);
	const query = url.searchParams.get("query") || "";
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const pageSize = 10;

	const allUsersPaginatedDocuments = await db.document.findMany({
		where: {
			userId: session.user.id,
			title: {
				contains: query,
			},
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const totalDocuments = await db.document.count({
		where: {
			userId: session.user.id,
			title: {
				contains: query,
			},
		},
	});

	if (!allUsersPaginatedDocuments) {
		throw new Error("User does not create any documents");
	}

	return NextResponse.json({
		documents: allUsersPaginatedDocuments,
		totalPages: Math.ceil(totalDocuments / pageSize),
	});
}
