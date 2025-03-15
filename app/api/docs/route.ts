import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const allUsersDocuments = await db.document.findMany({
		where: {
			userId: session.user.id,
		},
	});

	return NextResponse.json({
		documents: allUsersDocuments,
	});
}
