"use client"

import { FC, ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

type AppClerkProviderProps = {
    children?: ReactNode
}

const AppClerkProvider: FC<AppClerkProviderProps> = ({
    children
}: AppClerkProviderProps) => {
    const convex = new ConvexReactClient(process.env.);


    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default AppClerkProvider