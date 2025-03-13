import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const allUsersDocuments = await db.document.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json({
        documents: allUsersDocuments,
    });
}