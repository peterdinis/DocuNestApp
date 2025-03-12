'use client';

import { fetchFolderDetail } from '@/app/_store/queries/folderQueries';
import { useQuery } from '@tanstack/react-query';

type DetailOptions = {
    id: number;
    isEditMode: boolean
}

const useFolderDetail = ({ id, isEditMode }: DetailOptions) => {
    return useQuery({
        queryKey: ['folderDetail', id],
        queryFn: async () => {
            return await fetchFolderDetail(id);
        },
        refetchOnWindowFocus: true,
        refetchInterval: isEditMode ? 5000 : false,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });
};

export default useFolderDetail;