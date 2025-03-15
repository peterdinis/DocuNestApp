'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryClient } from '@/app/_store/queryClient';
import { useRouter } from 'next/navigation';
import {
    updateFolder,
    UpdateFolderData,
} from '@/app/_store/mutations/folderMutations';
import { Dispatch, SetStateAction } from 'react';

type UseUpdateFolderOptions = {
    id: string;
    setIsEditMode?: Dispatch<SetStateAction<boolean>>;
    setName?: Dispatch<SetStateAction<string>>;
};

const useUpdateFolder = ({
    id,
    setIsEditMode,
    setName,
}: UseUpdateFolderOptions) => {
    const router = useRouter();

    return useMutation({
        mutationKey: ['updateFolder'],
        mutationFn: (data: UpdateFolderData) => updateFolder(id, data),
        onSuccess: (updatedData: any) => {
            if (setIsEditMode) setIsEditMode(false);
            if (setName) setName(updatedData.name);
            toast.success('Folder was edited');
            queryClient.invalidateQueries({
                queryKey: ['folderDetail', id],
            });
            router.push('/folders/all');
        },
        onError: () => {
            toast.error('Folder was not edited');
        },
    });
};

export default useUpdateFolder;