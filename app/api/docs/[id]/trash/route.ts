import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	try {
		const { documentId } = await request.json();

		const session = await auth.api.getSession({ headers: request.headers });

		if (!session || !session.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		const findOneDocument = await db.document.findFirst({
			where: { id: documentId },
		});

		if (!findOneDocument) {
			console.log(`Document with ID ${documentId} not found`);
			return NextResponse.json(
				{ error: "Document not found" },
				{ status: 404 },
			);
		}

		if (findOneDocument.userId !== session.user.id) {
			return NextResponse.json({ error: "Not authorized" }, { status: 403 });
		}

		await db.document.update({
			where: { id: findOneDocument.id },
			data: { inTrash: true },
		});

		return new NextResponse("Removed from trash and updated", {
			status: 200,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Internal server error", details: "ERROR" },
			{ status: 500 },
		);
	}
}
