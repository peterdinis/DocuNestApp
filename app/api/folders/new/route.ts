import { getSession } from '@/lib/auth-client';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const session = await getSession()

        if (!session || !session.data?.user?.id) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const { name } = await req.json();

        const createNewFolder = await db.folder.create({
            data: {
                userId: session.data?.user?.id,
                name,
            },
        });

        revalidatePath('/dashboard');
        return NextResponse.json(createNewFolder, { status: 200 });
    } catch (error) {
        return new NextResponse('POST,FOLDER CREATE ERROR', { status: 500 });
    }
}