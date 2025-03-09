import {
    betterAuth
} from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from './db';

export const auth = betterAuth({
    appName: "better_auth_nextjs",
    database: prismaAdapter(db, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 20,
    },
});