"use client";

import type { FC } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

interface EditorProps {
	onChange: (content: string) => void;
	initialContent: string;
}

const Editor: FC<EditorProps> = ({ onChange, initialContent }) => {
	const editor = useCreateBlockNote({
		
		
	});

	return <BlockNoteView editor={editor} />;
};

export default Editor;
