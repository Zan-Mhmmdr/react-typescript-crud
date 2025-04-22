import { useState } from 'react'
import { useFetchCharacter } from '../services/useFetchCharacter'
import { useCreateCharacter } from '../services/useCreateCharacter'
import { useDeleteCharacter } from '../services/useDeleteCharacter'
import { useEditCharacter } from "../services/useEditCharacter"

const EmployeesPage = () => {
    const { data, refetch } = useFetchCharacter()
    const { mutate, } = useCreateCharacter()
    const { mutate: deleteCharacter } = useDeleteCharacter()
    const { mutate: mutateEdit } = useEditCharacter()

    const [editInputNameTeks, setEditInputNameTeks] = useState("")
    const [editInputJobTeks, setEditInputJobTeks] = useState("")
    const [inputCreateNameTeks, setInputCreateNameTeks] = useState("")
    const [inputCreateJobTeks, setInputCreateJobTeks] = useState("")
    const [selectedCharacterId, setSelectedCharacterId] = useState("")


    const renderCharacters = () => {
        return data?.data.map((character) =>
        (
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
        )
    }

    const handleCreateCharacter = async () => {
        if (inputCreateNameTeks === "") {
            alert("Name cannot be empty!")
            return
        }
        const newCharacter = {
            name: inputCreateNameTeks,
            job: inputCreateJobTeks,
        };
        mutate(newCharacter);  // Trigger the mutation
        setInputCreateNameTeks("")
        setInputCreateJobTeks("")
    }

    const handleDeleteCharacter = async (characterId: string) => {
        await deleteCharacter(characterId)
        refetch()
    }

    const handleEditCharacter = async () => {
        if (editInputNameTeks && setSelectedCharacterId) {
            setSelectedCharacterId("")
            setEditInputNameTeks("")
            setEditInputJobTeks("")
        }
        mutateEdit({
            characterID: selectedCharacterId, // Rename selectedCharacterId to characterID
            payload: {
                name: editInputNameTeks,
                job: editInputJobTeks
            }
        })
        refetch()
    }

    return (
        <div>
            <h2>List Character: </h2>

            <button style={{
                marginTop: "20px"
            }} onClick={refetch}>Fetch Character</button>

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
                        renderCharacters()
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
                                placeholder='Input job' />
                        </td>
                        <td>
                            <button
                                onClick={handleCreateCharacter}>Create Hero
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <input
                                onChange={e => setEditInputNameTeks(e.target.value)}
                                type="text"
                                value={editInputNameTeks}
                                placeholder='Edit name' />
                        </td>
                        <td>
                            <input
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


            </table>
        </div>
    )
}

export default EmployeesPage