import { getSession } from "@/lib/auth-client";
import { db } from "@/lib/db";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
	fileUploader: f([
		"application/pdf",
		"application/xml",
		"text/plain",
		"application/msword",
	])
		.middleware(async ({ req }) => {
			const session = await getSession();
			if (!session || !session.data!.user) {
				throw new UploadThingError("Unauthorized");
			}
			return { userId: session.data!.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				const session = await getSession();
				const appFile = await db.file.create({
					data: {
						name: file.name,
						size: file.size,
						createdAt: new Date().toISOString(),
						type: file.type,
						userId: session.data?.user.id!,
					},
				});
				return { uploadedBy: metadata.userId };
			} catch (error) {
				console.error("Error in onUploadComplete:", error);
			}
		}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
