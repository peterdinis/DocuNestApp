'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import type { FC } from 'react';
import Loading from '../shared/Loading';

const CollaborativeRoom: FC = () => {

    return (
        <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<Loading />}>
               <div className='collaborative-room'>
                
               </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom