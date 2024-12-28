"use client";

import {
	ClientSideSuspense,
	LiveblocksProvider,
} from "@liveblocks/react/suspense";
import type { ReactNode } from "react";
import Loading from "../shared/Loading";

const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<LiveblocksProvider authEndpoint="/api/liveblocks-auth">
			<ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
		</LiveblocksProvider>
	);
};

export default Provider;
