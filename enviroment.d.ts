declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string
            LIVEBLOCKS_PUBLIC_KEY: string;
            LIVEBLOCKS_SECRET_KEY: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};