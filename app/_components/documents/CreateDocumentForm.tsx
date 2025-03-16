"use client"

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import useCreateDocument from "@/app/_hooks/docs/useCreateDocument";
import { useCreateBlockNote } from "@blocknote/react";

const CreateDocumentForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: { title: "", description: "" },
  });

  const { mutate: createDocumentMut, isPending } = useCreateDocument();
  const router = useRouter();
  const editor = useCreateBlockNote({});

  const onSubmit = (formData: { title: string; description: string }) => {
    createDocumentMut(formData);
    reset();
    router.push("/dashboard");
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty || watch("description") || watch("title")) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, watch]);

  const handleGoBack = () => {
    if (!isDirty && !watch("description") && !watch("title")) {
      router.push("/dashboard");
    } else if (confirm("Máte neuložené zmeny. Naozaj chcete odísť?")) {
      router.push("/dashboard");
    }
  };

  // Add editorContent state handling for description
  const handleEditorChange = () => {
    const markdown = editor.markdown;
    setValue("description", markdown, { shouldDirty: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nový dokument</h1>
      
      <p className="text-gray-600 mb-6">
        Nové dokumenty sú vždy zaradené do priečinka „Nepriradené dokumenty".
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between mb-4">
          <Button type="button" variant="outline">Použiť AI</Button>
          <Button type="button" onClick={handleGoBack} variant="outline">Späť</Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">Názov</label>
            <input
              id="title"
              type="text"
              className="w-full p-2 border rounded"
              {...register("title", { required: "Názov je povinný" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">Popis</label>
            <div className="border rounded p-1 min-h-64">
              <BlockNoteView 
                editor={editor} 
                onChange={handleEditorChange}
                theme="light"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Spracovávam...
              </>
            ) : (
              "Vytvoriť dokument"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDocumentForm;