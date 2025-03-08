import { axiosInstance } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"

export const useCreateCharacter = () => {
    return useMutation({
        mutationFn: async (payLoad: {
            name: string,
            job: string
        }) => {
            const responseCharacters = await axiosInstance.post("/characters", {
                name: payLoad.name ? payLoad.name : undefined,
                job: payLoad.job ? payLoad.job : undefined
            })

            return responseCharacters
        }
    }
    )
}