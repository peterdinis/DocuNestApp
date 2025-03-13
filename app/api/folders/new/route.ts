import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const session = await auth.api.getSession({ headers: req.headers }); // Pass headers instead of req
		console.log("Session:", session);

		if (!session || !session.user.id) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		const { name } = await req.json();

		const createNewFolder = await db.folder.create({
			data: {
				userId: session.user.id, // Use session.data.user.id
				name,
			},
		});

		revalidatePath("/dashboard");
		return NextResponse.json(createNewFolder, { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new NextResponse("POST, FOLDER CREATE ERROR", { status: 500 });
	}
}
