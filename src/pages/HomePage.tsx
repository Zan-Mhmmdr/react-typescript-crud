import { useState } from "react"
import { useCreateCharacter } from "../services/useCreateCharacter"
import { useFetchCharacter } from "../services/useFetchCharacter"
import { useDeleteCharacter } from "../services/useDeleteCharacter"

type FormData = {
    id: string,
    name: string,
    job: string,
}

const HomePage = () => {
    const [showAddCharacter, setShowAddCharacter] = useState(false)
    const [animateModal, setAnimateModal] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState(false)
    const { data } = useFetchCharacter()
    const { mutate } = useCreateCharacter()
    const { mutate: deleteCharacter, } = useDeleteCharacter()

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
        }, 300);
    }

    const handleShowModalDelete = () => {
        setConfirmDeleteId(true)
        setTimeout(() => {
            setAnimateModal(true)
        }, 10);
    }

    return (
        <>
            {/* Modal buat nambahin data */}
            {showAddCharacter && (
                <div className={`fixed flex justify-center items-center h-screen w-screen top-0 left-0 bg-black/50 z-20 transition-opacity duration-300 ${animateModal ? "opacity-100" : "opacity-0"}`}>
                    <div className={`w-1/4 gap-8 p-8 bg-white rounded shadow-lg transform transition-transform duration-300 ${animateModal ? "scale-100" : "scale-95"}`}>
                        {/* isi modal */}

                        <button className="absolute top-2 right-3 cursor-pointer hover:text-red-500" onClick={handleCloseModal}>
                            X
                        </button>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target as HTMLFormElement)
                            const name = formData.get('name') as string
                            const job = formData.get('job') as string
                            mutate({ name, job })
                        }} className="w-full ">
                            <div className="flex flex-col space-y-4">
                                <input type="text" name="name" placeholder="Name" className="p-2 border border-gray-300 rounded" />
                                <input type="text" name="job" placeholder="Job" className="p-2 border border-gray-300 rounded" />
                                <button type="submit" className="bg-black w-full text-white font-bold px-4 py-2 rounded">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal buat konfirmasi delete */}
            {confirmDeleteId && (
                <div className={`fixed inset-0 z-30 bg-black/50 flex items-center justify-center transition-opacity duration-300 `}>
                    <div className="bg-white rounded p-6 w-[90%] max-w-sm shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Yakin ingin menghapus?</h2>
                        <p className="text-gray-600 mb-6">Data yang dihapus tidak bisa dikembalikan.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    deleteCharacter(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                }}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div>
                <div className="container w-3xl mx-auto p-4 mt-10  ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Daftar Data</h2>
                        <button onClick={handleShowModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tambah Data</button>
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
                                            <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm">Edit</button>
                                            <button onClick={() => setConfirmDeleteId(character.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Hapus</button>
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