import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

type CharacterResponse = {
    id: string;
    name: string;
    job: string;
    // Add other character fields here based on the API response
};

export const useEditCharacter = () => {
    return useMutation<
        CharacterResponse, // Type for the mutation response
        Error, // Type for errors
        { characterID: string; payload: { name: string; job: string } } // Type for the input variables
    >({
        mutationFn: async ({ characterID, payload }) => {
            const response = await axiosInstance.patch(`/characters/${characterID}`, {
                name: payload.name ? payload.name : undefined,
                job: payload.job ? payload.job : undefined,
            });

            return response.data; // Ensure you return the actual data part of the response
        },
        onError: (error) => {
            console.error('Error updating character:', error);
            // Optionally add custom error handling here
        },
        onSuccess: (data) => {
            console.log('Character updated successfully:', data);
            // Optionally add success actions like invalidating queries or updating local state
        },
    });
};