"use client";

import useOpenAI from "@/app/_hooks/shared/useAI";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { type FC, useState } from "react";

type AIDocProps = {
	onContentGenerated: (content: string) => void;
};
const AIDoc: FC<AIDocProps> = ({ onContentGenerated }) => {
	const [prompt, setPrompt] = useState("");
	const { generateContent, isLoading, error } = useOpenAI();

	const handleGenerate = async () => {
		if (!prompt) return;

		try {
			const content = await generateContent(prompt);
			onContentGenerated(content);
		} catch (error) {
			console.error("Error generating content:", error);
		}
	};

	return (
		<div>
			<Textarea
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder="Enter your prompt"
			/>
			<Button onClick={handleGenerate} disabled={isLoading}>
				{isLoading ? <Loader2 className="animate-spin" /> : "Generate Content"}
			</Button>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default AIDoc;
