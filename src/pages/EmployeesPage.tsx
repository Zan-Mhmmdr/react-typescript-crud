import { useState } from 'react'
import { useFetchCharacter } from '../services/useFetchCharacter'
import { useCreateCharacter } from '../services/useCreateCharacter'
import { useDeleteCharacter } from '../services/useDeleteCharacter'
import { useEditCharacter } from "../services/useEditCharacter"

const EmployeesPage = () => {
    const { fetchCharacter, characters, characterError, isLoading } = useFetchCharacter()
    const { createCharacterError, createCharacterIsLoading, createCharacter } = useCreateCharacter()
    const { deleteCharacterIsLoading, deleteCharacter, deleteCharacterError } = useDeleteCharacter()
    const { editCharacter } = useEditCharacter()

    const [editInputTeks, setEditInputTeks] = useState("")
    const [inputTeks, setInputTeks] = useState("")
    const [selectedCharacterId, setSelectedCharacterId] = useState("")

    const handleCreateCharacter = async () => {
        await createCharacter(inputTeks);
        await fetchCharacter()
        setInputTeks("")
    }

    const handleDeleteCharacter = async (characterId: string) => {
        await deleteCharacter(characterId)
        await fetchCharacter()
    }

    const handleEditCharacter = async () => {
        alert("Edited: " + selectedCharacterId)
    }

    return (
        <div>
            <h2>List Character: </h2>

            {
                isLoading && <p>Loading...</p>
            }

            {
                characterError && <p style={{ color: "red" }}>{characterError}</p>
            }

            <button style={{
                marginTop: "20px"
            }} disabled={isLoading} onClick={fetchCharacter}>Fetch Character</button>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                        <th>Select Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        characters.map((character) => {
                            return (
                                <tr key={character.id}>
                                    <td>{character.id}</td>
                                    <td>{character.name}</td>
                                    <td>
                                        <button onClick={() => handleDeleteCharacter(character.id)}>Delete</button>

                                    </td>
                                    <td>
                                        <input
                                            type="radio" name='char-edit'
                                            onChange={() => setSelectedCharacterId(character.id)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}>
                            <input onChange={(e) => setInputTeks(e.target.value)}
                                type="text"
                                value={inputTeks} />
                        </td>
                        <td>
                            <button
                                disabled={createCharacterIsLoading}
                                onClick={handleCreateCharacter}>Create Hero
                            </button>
                        </td>
                    </tr>
                    {createCharacterError && (
                        <tr>
                            <td colSpan={3}>
                                {createCharacterError}
                            </td>
                        </tr>
                    )}

                    <tr>
                        <td colSpan={2}>
                            <input
                                onChange={e => setEditInputTeks(e.target.value)}
                                type="text" />
                        </td>
                        <td>
                            <button onClick={handleEditCharacter}>Update Char</button>
                        </td>
                    </tr>
                </tfoot>
                {
                    createCharacterIsLoading && <p>Loading...</p>
                }

                {
                    createCharacterError && <p style={{ color: "red" }}>{createCharacterError}</p>
                }
            </table>


        </div>
    )
}

export default EmployeesPage