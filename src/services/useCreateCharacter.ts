import { useState } from "react"
import { axiosInstance } from "../lib/axios"

export const useCreateCharacter = () => {
    const [createCharacterIsLoading, setCreateCharacterIsLoading] = useState(false)
    const [createCharacterError, setCreateCharacterError] = useState("")


    const createCharacter = async (payLoad: {
        name: string,
        job: string
    }) => {
        try {
            setCreateCharacterIsLoading(true)

            await axiosInstance.post("/characters", {
                name: payLoad.name ? payLoad.name : undefined,
                job: payLoad.job ? payLoad.job : undefined
            }
            )
        } catch (error) {
            setCreateCharacterError((error as TypeError).message)
        } finally {
            setCreateCharacterIsLoading(false)
        }
    }

    return {
        createCharacterIsLoading,
        createCharacterError,
        createCharacter
    }
}