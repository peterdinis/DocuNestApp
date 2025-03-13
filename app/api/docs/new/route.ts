import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const { title, description } = await req.json();

        const createNewDoc = await db.document.create({
            data: {
                userId: session.user.id,
                title: title,
                description: description,
            },
        });

        let testFolder = await db.folder.findFirst({
            where: {
                userId: session.user.id,
                name: "Unassigned documents"
            }
        });

        if (!testFolder) {
            testFolder = await db.folder.create({
                data: {
                    name: "Unassigned documents",
                    userId: session.user.id
                }
            });
        }

        await db.document.update({
            where: {
                id: createNewDoc.id,
            },
            data: {
                folderId: testFolder.id
            }
        });

        revalidatePath('/dashboard');
        return NextResponse.json(createNewDoc, { status: 200 });
    } catch (error) {
        return new NextResponse('POST, NEW DOC ERROR', { status: 500 });
    }
}