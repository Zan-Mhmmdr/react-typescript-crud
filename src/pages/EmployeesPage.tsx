import { useState } from 'react'
import { useFetchCharacter } from '../services/useFetchCharacter'
import { useCreateCharacter } from '../services/useCreateCharacter'
import { useDeleteCharacter } from '../services/useDeleteCharacter'

const EmployeesPage = () => {
    const { fetchCharacter, characters, characterError, isLoading } = useFetchCharacter()
    const { createCharacterError, createCharacterIsLoading, createCharacter } = useCreateCharacter()
    const { deleteCharacterIsLoading, deleteCharacter, deleteCharacterError } = useDeleteCharacter()
    const [inputTeks, setInputTeks] = useState("")

    const handleCreateCharacter = async () => {
        await createCharacter(inputTeks);
        await fetchCharacter()
        setInputTeks("")
    }

    const handleDeleteCharacter = async (characterId: string) => {
        await deleteCharacter(characterId)
        await fetchCharacter()
    }

    return (
        <div>
            <h2>List Character: </h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
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
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={handleCreateCharacter}>Send</button>
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


            {
                isLoading && <p>Loading...</p>
            }

            {
                characterError && <p style={{ color: "red" }}>{characterError}</p>
            }

            <button style={{
                marginTop: "20px"
            }} disabled={isLoading} onClick={fetchCharacter}>Fetch Character</button>
        </div>
    )
}

export default EmployeesPage