import { useEffect } from "react";
import type { FC } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";

interface EditorProps {
	onChange: (content: string) => void;
	initialContent: string;
}

const Editor: FC<EditorProps> = ({ onChange, initialContent }) => {
	const editor = useCreateBlockNote();

	useEffect(() => {
		if (!editor) return;

		try {
			const content = JSON.parse(initialContent);
			editor.replaceBlocks(editor.document, content);
		} catch (error) {
			console.error("Chyba pri parsovaní obsahu editora:", error);
		}
	}, [editor, initialContent]);

	useEffect(() => {
		if (!editor) return;

		const handleUpdate = () => {
			const content = JSON.stringify(editor.document);
			onChange(content);
		};

		editor.onEditorContentChange(handleUpdate);

		return () => {
			editor.onEditorContentChange?.(handleUpdate);
		};
	}, [editor, onChange]);

	return <BlockNoteViewRaw editor={editor} />;
};

export default Editor;
