import { useState } from "react"
import { useCreateCharacter } from "../services/useCreateCharacter"
import { useFetchCharacter } from "../services/useFetchCharacter"
import { useDeleteCharacter } from "../services/useDeleteCharacter"
import { useEditCharacter } from "../services/useEditCharacter"
import AddCharacterModal from "../components/Modals/addCharacterModal"
import AddCharacterDeleteModal from "../components/Modals/AddDeleteModal"

type FormData = {
    id: string,
    name: string,
    job: string,
}

const HomePage = () => {
    const [showAddCharacter, setShowAddCharacter] = useState(false)
    const [showDeleteCharacter, setShowDeleteCharacter] = useState(false)
    const [showEditCharacter, setShowEditCharacter] = useState(false)
    const [editData, setEditData] = useState<FormData | null>(null)
    const [animateModal, setAnimateModal] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
    const { data } = useFetchCharacter()
    const { mutate } = useCreateCharacter()
    const { mutate: deleteCharacter, } = useDeleteCharacter()
    const { mutate: editCharacter } = useEditCharacter()

    const handleShowModal = () => {
        setShowAddCharacter(true)
        setTimeout(() => {
            setAnimateModal(true)
        }, 10);
    }

    const handleCloseModal = () => {
        setAnimateModal(false)
        setTimeout(() => {
            setShowAddCharacter(false)
            setShowEditCharacter(false)
            setShowDeleteCharacter(false)
        }, 300);
    }

    const handleShowModalDelete = (id: string) => {
        setShowDeleteCharacter(true)
        setConfirmDeleteId(id)
        setTimeout(() => {
            setAnimateModal(true)
        }, 10);
    }

    const handleEditCharacter = (character: FormData) => {
        setEditData(character.id ? character : null)
        setShowEditCharacter(true)
        setTimeout(() => {
            setAnimateModal(true)
        }, 10);
    }

    return (
        <>
            {/* Modal buat nambahin data */}
            {showAddCharacter && (
                <AddCharacterModal
                    onClose={handleCloseModal}
                    animate={animateModal}
                    onSubmit={({ name, job }) => mutate({ name, job })}
                />
            )}

            {/* Modal buat konfirmasi delete */}
            {showDeleteCharacter && (
                <AddCharacterDeleteModal
                    onClose={handleCloseModal}
                    animate={animateModal}
                    onSubmit={({ id }) => {
                        deleteCharacter(id)
                        setConfirmDeleteId(null)
                    }}
                    confirmDeleteId={confirmDeleteId }
                />
            )}

            {/* Modal buat edit  */}
            {showEditCharacter && editData && (
                <div className={`fixed flex justify-center items-center h-screen w-screen top-0 left-0 bg-black/50 z-20 transition-opacity duration-300 ${animateModal ? "opacity-100" : "opacity-0"}`}>
                    <div className={`w-1/4 gap-8 p-8 bg-white rounded shadow-lg transform transition-transform duration-300 ${animateModal ? "scale-100" : "scale-95"}`}>

                        <button className="absolute top-2 right-3 cursor-pointer hover:text-red-500" onClick={handleCloseModal}>
                            X
                        </button>

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target as HTMLFormElement)
                            const name = formData.get('name') as string
                            const job = formData.get('job') as string

                            // Kirim data yang sudah diedit
                            editCharacter({ characterID: editData.id, payload: { name, job } })
                        }} className="w-full">
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editData.name}
                                    placeholder="Name"
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    name="job"
                                    defaultValue={editData.job}
                                    placeholder="Job"
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <button type="submit" className="bg-green-500 w-full text-white font-bold px-4 py-2 rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <div>
                <div className="container w-3xl mx-auto p-4 mt-10  ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Daftar Data</h2>
                        <button onClick={handleShowModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Tambah Data</button>
                    </div>

                    <div className=" h-[500px] overflow-y-auto rounded-x">
                        <table className="min-w-full bg-white border border-gray-200  shadow-2xl">
                            <thead className="bg-gray-100 text-left sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 border-b">id</th>
                                    <th className="px-4 py-2 border-b">Nama</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b flex justify-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((character: FormData) => (
                                    <tr key={character.id} className="hover:bg-gray-200">
                                        <td className="px-4 py-2 border-b">{character.id}</td>
                                        <td className="px-4 py-2 border-b">{character.name}</td>
                                        <td className="px-4 py-2 border-b">{character.job}</td>
                                        <td className="px-4 py-2 border-b space-x-2 flex justify-center">
                                            <button onClick={() => handleEditCharacter(character)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm cursor-pointer">Edit</button>
                                            <button onClick={() => {
                                                handleShowModalDelete(character.id)
                                            }} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm cursor-pointer">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage