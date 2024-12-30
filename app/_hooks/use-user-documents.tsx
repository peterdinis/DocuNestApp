import { getDocuments } from "../_actions/roomActions";

const useUserDocuments = async (emailAddress: string) => {
    const roomDocuments = await getDocuments(emailAddress);
    return roomDocuments;
}

export default useUserDocuments;