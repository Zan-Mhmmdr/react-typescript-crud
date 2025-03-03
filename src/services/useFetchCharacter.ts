import { AxiosResponse } from "axios"
import { useState } from "react"
import { axiosInstance } from "../lib/axios"

type Characters = {
    id: string,
    name: string,
    job: string
}

export const useFetchCharacter = () => {
    const [characters, setCharacter] = useState<Characters[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [characterError, setCharacterError] = useState("")

    const fetchCharacter = async ():Promise<void> => {
        setIsLoading(true)
        try {
            // const response = await fetch("http://localhost:3000/character", {
            //     method: "GET"
            // })

            // const responseJSON = (await response.json()) as Characters[]

            // console.log(responseJSON)

            const response: AxiosResponse<Characters[]> = await axiosInstance.get("/characters")

            console.log(response)

            setCharacter(response.data)

        } catch (error) {
            setCharacterError((error as TypeError).message)
            // alert("Gagal mendapatkan data!" + error)
        } finally {
            setIsLoading(false)
        }

        
    }

    return {
        characters,
        isLoading,
        characterError,
        fetchCharacter
    }
}

