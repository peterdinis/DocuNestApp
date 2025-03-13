import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const session = await auth.api.getSession({ headers: request.headers });
	const allUsersFolders = await db.folder.findMany({
		where: {
			userId: session!.user.id,
		},
	});
	if (!allUsersFolders) {
		throw new Error("User does not create any folders");
	}

	return NextResponse.json(allUsersFolders);
}
