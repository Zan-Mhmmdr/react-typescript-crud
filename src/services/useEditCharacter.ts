import { useState } from "react"
import { axiosInstance } from "../lib/axios"

export const useEditCharacter = () => {
    const [editCharacterIsLoading, setEditCharacterIsLoading] = useState(false)
    const [editCharacterError, setEditCharacterError] = useState("")


    const editCharacter = async (characterID: string, payload: string) => {
        try {
            setEditCharacterIsLoading(true)

            // PATCH => MENGGANTI BEBERAPA FIELDS DALAM OBJECT/DATA/RECORD
            // PUT => MENGGANTI KESELURUHAN OBJECT/DATA/RECORD


            await axiosInstance.patch(`/characters/${characterID}`, {
                name: payload,
            })
        } catch (error) {
            setEditCharacterError((error as TypeError).message)
        } finally {
            setEditCharacterIsLoading(false)
        }
    }

    return {
        editCharacterIsLoading,
        editCharacterError,
        editCharacter,
        useEditCharacter
    }
}