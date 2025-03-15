'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import QuillEditor from './QuillEditor';
import useCreateDocument from '@/app/_hooks/docs/useCreateDocument';

const CreateDocumentForm: FC = () => {
    const [description, setDescription] = useState('');
    const [drawerInputText, setDrawerInputText] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
        watch,
    } = useForm();

    const { mutate: createDocumentMut, isPending } = useCreateDocument();

    const handleDescriptionChange = (content: string) => {
        setDescription(content);
        setValue('description', content, { shouldDirty: true });
    };

    const router = useRouter();

    const onSubmit = (formData: any) => {
        formData.description = description;
        createDocumentMut(formData);
        reset();
        router.push('/dashboard');
    };

    useEffect(() => {
        if (drawerInputText) {
            setDescription(
                (prevDescription) => `${prevDescription}\n${drawerInputText}`,
            );
            setValue(
                'description',
                `${description ?? ''}\n${drawerInputText}`,
                { shouldDirty: true },
            );
            setDrawerInputText('');
        }
    }, [drawerInputText, setValue, description]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const title = watch('title');
            const description = watch('description');
            if (isDirty || description || title) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, description, watch]);

    const handleGoBack = () => {
        const title = watch('title');
        const description = watch('description');
        if ((!isDirty && description) || !title) {
            router.push('/dashboard');
        } else if (
            confirm('You have unsaved changes. Are you sure you want to leave?')
        ) {
            router.push('/dashboard');
        }
    };

    return (
        <div>
            <h2 className='mt-5 flex justify-center align-top text-4xl'>
                New document
            </h2>

            <p className='mt-5 text-center text-xl font-bold text-red-800'>
                New documents are always assigned to the Unassigned documents
                folder
            </p>

            <div className='mt-5 flex justify-center'>
                <Button variant='outline'>
                    Use AI
                </Button>
                <Button variant='default' className='ml-5' onClick={handleGoBack}>
                    Go back
                </Button>
            </div>

            // TODO: Later drawer with ai functions
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-5 flex flex-col items-center'
            >
                <input
                    type='text'
                    {...register('title', { required: 'Title is required' })}
                    placeholder='Title'
                    className='mb-2 border border-gray-300 p-2'
                />
                {errors.title && (
                    <span className='text-red-500'>
                        {errors.title.message as unknown as ReactNode}
                    </span>
                )}
                <Button type='submit' className='mt-6' disabled={isPending}>
                    {isPending ? (
                        <Loader2 className='h-8 w-8 animate-bounce' />
                    ) : (
                        'Create Document'
                    )}
                </Button>
                <QuillEditor
                    value={description}
                    readOnly={false}
                    onChange={handleDescriptionChange}
                />
                {errors.description && (
                    <span className='text-red-500'>
                        {errors.description.message as unknown as ReactNode}
                    </span>
                )}
            </form>
        </div>
    );
};

export default CreateDocumentForm;
