declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            CONVEX_AUTH_URL: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};