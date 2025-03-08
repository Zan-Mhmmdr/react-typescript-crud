import { axiosInstance } from "../lib/axios"
import { useQuery } from '@tanstack/react-query'

// Custom hook to fetch character data
export const useFetchCharacter = () => {
    return useQuery({
        queryKey: ['characters'],
        queryFn: async () => {
            const responseCharacters = await axiosInstance.get('/characters')

            return responseCharacters
        },
    })
}
