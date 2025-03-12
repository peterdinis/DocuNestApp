'use client';

import { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useDeleteFolder } from '@/app/_hooks/folders/useDeleteFolder';
import { useMoveFolderToTrash } from '@/app/_hooks/folders/useMoveFolderToTrash';

interface IDeleteFolderProps {
    folderId: string;
}

const DeleteFolder: FC<IDeleteFolderProps> = ({ folderId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const deleteFolderMut = useDeleteFolder(folderId);
    const moveToTrashMut = useMoveFolderToTrash();

    const onDelete = () => {
        deleteFolderMut.mutate();
    };

    const onMoveToTrash = () => {
        moveToTrashMut.mutate({
            folderId,
            inTrash: true,
        });
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <X className='rounded-lg bg-red-700 text-white' />
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Do you want to delete the folder?
                        </DialogTitle>
                    </DialogHeader>
                    <p className='ml-5 text-xl font-bold text-red-700'>
                        Attention, if you delete this folder, the files
                        contained in the given folder will also be
                        deleted.
                    </p>
                    <DialogFooter>
                        <Button variant='destructive' onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                        <Button variant='secondary' className='ml-2' onClick={onMoveToTrash}>
                            Move to Trash
                        </Button>
                        <Button variant='success' className='ml-2' onClick={onDelete}>
                            Delete Folder
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeleteFolder;
