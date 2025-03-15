import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
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

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const findOneDocument = await db.document.findUnique({
		where: {
			id,
		},
	});

	if (!findOneDocument) {
		throw new Error("Document not found");
	}

	return NextResponse.json(findOneDocument);
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

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const { title, description } = await request.json();

	await db.document.update({
		where: {
			id,
			userId: session.user.id,
		},
		data: {
			title: title,
			description: description,
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

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	await db.document.delete({
		where: {
			id,
			userId: session.user.id,
		},
	});

	revalidatePath("/dashboard");
	return new NextResponse("Succesfully Deleted data", { status: 200 });
}
