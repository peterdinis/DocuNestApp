"use client"

import { useEffect, useState } from "react";
import { getDocuments } from "../_actions/roomActions";

const useUserDocuments = (emailAddress: string | undefined) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!emailAddress) {
            setLoading(false);
            return;
        }

        const fetchDocuments = async () => {
            try {
                const roomDocuments = await getDocuments(emailAddress);
                setDocuments(roomDocuments || []);
            } catch (err) {
                setError("Failed to fetch documents");
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [emailAddress]);

    return { documents, loading, error };
};

export default useUserDocuments;