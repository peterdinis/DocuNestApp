"use client";

import type { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader2 } from "lucide-react";

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
            <RoomProvider id="my-room">
                <ClientSideSuspense fallback={<Loader2 className="animate-spin w-8 h-8" />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}