import { getSession } from '@/lib/auth-client';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const uploadRouter = {
    fileUploader: f(['application/pdf', 'text/plain', 'application/msword'])
        .middleware(async ({ req }) => {
            const session = await getSession()
            if (!session || !session.data!.user) {
                throw new UploadThingError('Unauthorized');
            }
            return { userId: session.data!.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            try {
                // TODO: File opearion for add
                return { uploadedBy: metadata.userId };
            } catch (error) {
                console.error('Error in onUploadComplete:', error);
            }
        }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;