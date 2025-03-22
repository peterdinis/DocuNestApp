"use client"

import { FC, useState } from 'react';
import useOpenAI from '@/app/_hooks/shared/useAI';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type AIDocProps = {
    onContentGenerated: (content: string) => void;
}
const AIDoc: FC<AIDocProps> = ({ onContentGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const { generateContent, isLoading, error } = useOpenAI();

    const handleGenerate = async () => {
        if (!prompt) return;

        try {
            const content = await generateContent(prompt);
            onContentGenerated(content);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center mt-3 font-bold text-3xl'>
                Use AI for your document
            </h2>
            <Input
                className='ml-3 mr-3 mt-5'
                type='text'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter your prompt'
            />
            <Button
                className='ml-3 mr-3 mt-5'
                color='primary'
                onClick={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className='animate-spin w-8 h-8' /> : 'Generate Content'}
            </Button>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default AIDoc;