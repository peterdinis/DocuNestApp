import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth-client";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const id = url.pathname.split("/").pop();

	if (!id) {
		return NextResponse.json(
			{ error: "Missing id parameter" },
			{ status: 400 },
		);
	}

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const findOneFolder = await db.folder.findFirst({
		where: {
			id,
		},
		include: {
			documents: true,
		},
	});

	if (!findOneFolder) {
		throw new Error("Document not found");
	}

	return NextResponse.json(findOneFolder);
}

export async function PUT(request: NextRequest) {
	const url = new URL(request.url);
	const id = url.pathname.split("/").pop();

	if (!id) {
		return NextResponse.json(
			{ error: "Missing id parameter" },
			{ status: 400 },
		);
	}

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const { name } = await request.json();

	await db.folder.update({
		where: {
			id,
			userId: session.user.id,
		},
		data: {
			name,
		},
	});

	return new NextResponse("Succesfully updated data", { status: 200 });
}

export async function DELETE(request: NextRequest) {
	const url = new URL(request.url);
	const id = url.pathname.split("/").pop();

	if (!id) {
		return NextResponse.json(
			{ error: "Missing id parameter" },
			{ status: 400 },
		);
	}

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session || !session.user.id) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	try {
		const folder = await db.folder.findUnique({
			where: { id },
		});

		if (!folder || folder.userId !== session.user.id) {
			return NextResponse.json(
				{ message: "Folder not found or access denied" },
				{ status: 404 },
			);
		}

		await db.folder.delete({
			where: { id: folder.id },
		});

		return NextResponse.json(
			{ message: "Folder deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting folder:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
