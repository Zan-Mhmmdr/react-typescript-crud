import { AxiosInstance } from "axios";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

const useEditCharacter = () => {
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isEditCharacter, setIsEditCharacter] = useState("")
    const [editError, setEditError] = useState("")

    const handleEditCharacter = async (): Promise<void> => {
        setIsEditLoading(true);
        try {
            const response = await axiosInstance.patch("characters")
            const data = response.data
            setIsEditCharacter(data)
        } catch (error) {
            setEditError((error as TypeError).message)
        } finally {
            setIsEditLoading(false)
        }
    }

    return {
        isEditCharacter,
        handleEditCharacter,
    }
}