import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"

type DeleteCharacterResponse = {
    success: boolean;
    message: string;
    // Add other response properties based on your API's response
};


export const useDeleteCharacter = () => {
    return useMutation<DeleteCharacterResponse, Error, string>({
        mutationFn: async (characterID: string) => {
            const response = await axiosInstance.delete(`/characters/${characterID}`);
            return response.data; // Return only the data part of the response
        },
        onError: (error) => {
            console.error('Error deleting character:', error);
            // Optionally add more error handling here
        },
        onSuccess: (data) => {
            console.log('Character deleted successfully:', data);
            // Optionally add success actions (like invalidating queries or updating local state)
        },
    })
}