import { getSession } from '@/lib/auth-client';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = getSession()
    const allUsersFolders = await db.folder.findMany({
        where: {
            userId: (await session).data?.user.id
        },
    });
    if (!allUsersFolders) {
        throw new Error('User does not create any folders');
    }

    return NextResponse.json(allUsersFolders);
}