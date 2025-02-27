import { useState } from "react"
import { axiosInstance } from "../lib/axios"

export const useDeleteCharacter = () => {
    const [deleteCharacterError, setDeleteCharacterError] = useState("")
    const [deleteCharacterIsLoading, setDeleteCharacterIsLoading] = useState(false)
 
    const deleteCharacter = async (characterID: string) => {
        try {
            setDeleteCharacterIsLoading(true)
            await axiosInstance.delete(`/characters/${characterID}`)
        } catch (error) {
            setDeleteCharacterError((error as TypeError).message)
        } finally {
            setDeleteCharacterIsLoading(false)
        }
    }

    return {
        deleteCharacterError,
        deleteCharacterIsLoading,
        deleteCharacter,
    }
}