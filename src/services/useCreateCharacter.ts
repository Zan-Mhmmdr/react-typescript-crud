import { axiosInstance } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"

type payLoadType = {
    name: string,
    job: string
}

export const useCreateCharacter = () => {
    return useMutation({
        mutationFn: async (payLoad: payLoadType) => {
            const responseCharacters = await axiosInstance.post("/characters", {
                name: payLoad.name ? payLoad.name : undefined,
                job: payLoad.job ? payLoad.job : undefined
            })

            return responseCharacters
        }
    }
    )
}