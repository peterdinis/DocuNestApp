"use client"

import { FC, useState } from 'react';
import useOpenAI from '@/app/_hooks/shared/useAI';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"

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
            <h3 className='text-center mt-6 font-bold text-3xl text-white'>
                Use Ai functions to write your content
            </h3>
            <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className='mt-5'
            />
            <Button className='mt-5' onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Content'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AIDoc;