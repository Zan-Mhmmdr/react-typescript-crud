import { useState } from 'react'
import { useFetchCharacter } from '../services/useFetchCharacter'
import { useCreateCharacter } from '../services/useCreateCharacter'
import { useDeleteCharacter } from '../services/useDeleteCharacter'
import { useEditCharacter } from "../services/useEditCharacter"

const EmployeesPage = () => {
    const { fetchCharacter, characters, characterError, isLoading } = useFetchCharacter()
    const { createCharacterError, createCharacterIsLoading, createCharacter } = useCreateCharacter()
    const { deleteCharacterIsLoading, deleteCharacter, deleteCharacterError } = useDeleteCharacter()
    const { editCharacter, editCharacterError, editCharacterIsLoading } = useEditCharacter()

    const [editInputNameTeks, setEditInputNameTeks] = useState("")
    const [editInputJobTeks, setEditInputJobTeks] = useState("")
    const [inputCreateNameTeks, setInputCreateNameTeks] = useState("")
    const [inputCreateJobTeks, setInputCreateJobTeks] = useState("")
    const [selectedCharacterId, setSelectedCharacterId] = useState("")

    const handleCreateCharacter = async () => {
        if (inputCreateNameTeks === "") {
            alert("Name cannot be empty!")
            return
          }
        await createCharacter({
            name: inputCreateNameTeks,
            job: inputCreateJobTeks
        });
        await fetchCharacter()
        setInputCreateNameTeks("")
        setInputCreateJobTeks("")
    }

    const handleDeleteCharacter = async (characterId: string) => {
        await deleteCharacter(characterId)
        await fetchCharacter()
    }

    const handleEditCharacter = async () => {
        if (editInputNameTeks && setSelectedCharacterId) {
            setSelectedCharacterId("")
            setEditInputNameTeks("")
            setEditInputJobTeks("")
        }
        await editCharacter(selectedCharacterId, {
            name: editInputNameTeks,
            job: editInputJobTeks
        })
        await fetchCharacter()
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
                        <th>Job</th>
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
                                    <td>{character.job}</td>
                                    <td>
                                        <button onClick={() => handleDeleteCharacter(character.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <input
                                            checked={character.id === selectedCharacterId}
                                            type="radio"
                                            name='char-edit'
                                            onChange={() => {
                                                setSelectedCharacterId(character.id);
                                                setEditInputNameTeks(character.name);
                                                setEditInputJobTeks(character.job)
                                            }} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <input onChange={(e) => setInputCreateNameTeks(e.target.value)}
                                type="text"
                                value={inputCreateNameTeks}
                                placeholder='Input name' />
                        </td>
                        <td>
                            <input onChange={(e) => setInputCreateJobTeks(e.target.value)}
                                type="text"
                                value={inputCreateJobTeks} 
                                placeholder='Input job'/>
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
                        <td></td>
                        <td>
                            <input
                                disabled={editCharacterIsLoading}
                                onChange={e => setEditInputNameTeks(e.target.value)}
                                type="text"
                                value={editInputNameTeks} 
                                placeholder='Edit name'/>
                        </td>
                        <td>
                            <input
                                disabled={editCharacterIsLoading}
                                onChange={(e) => {
                                    setEditInputJobTeks(e.target.value)
                                }}
                                type="text"
                                value={editInputJobTeks}
                                placeholder='Edit job' />
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