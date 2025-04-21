import { useCreateCharacter } from "../services/useCreateCharacter"
import { useFetchCharacter } from "../services/useFetchCharacter"
import { useDeleteCharacter } from "../services/useDeleteCharacter"
import { useEditCharacter } from "../services/useEditCharacter"
import AddCharacterModal from "../components/Modals/AddCharacterModal"
import AddCharacterDeleteModal from "../components/Modals/AddDeleteModal"
import AddEditCharacterModal from "../components/Modals/AddEditCharacterModal"
import { useModalStore } from "../stores/ModalStore"

type FormData = {
    id: string,
    name: string,
    job: string,
}

const HomePage = () => {
    const { data } = useFetchCharacter()
    const { mutate } = useCreateCharacter()
    const { mutate: deleteCharacter, } = useDeleteCharacter()
    const { mutate: editCharacter } = useEditCharacter()

    const { animateModal, closeModal, confirmDeleteId, editData, openModal, showAdd, showDelete, showEdit } = useModalStore()

    enum ModalType {
        ADD = "add",
        EDIT = "edit",
        DELETE = "delete"
    }

    return (
        <>
            {/* Modal buat nambahin data */}
            {showAdd && (
                <AddCharacterModal
                    onClose={closeModal}
                    animate={animateModal}
                    onSubmit={({ name, job }) => mutate({ name, job })}
                />
            )}

            {/* Modal buat konfirmasi delete */}
            {showDelete && (
                <AddCharacterDeleteModal
                    onClose={closeModal}
                    animate={animateModal}
                    onSubmit={({ id }) => {
                        deleteCharacter(id)
                    }}
                    confirmDeleteId={confirmDeleteId}
                />
            )}

            {/* Modal buat edit  */}
            {showEdit && editData && (
                <AddEditCharacterModal
                    onClose={closeModal}
                    animate={animateModal}
                    onSubmit={({ name, job }) => {
                        if (!editData) return

                        editCharacter({
                            characterID: editData.id,
                            payload: { name, job }
                        })
                        closeModal()      // tutup modal setelah submit
                    }} editData={editData}
                />
            )}

            <div>
                <div className="container w-3xl mx-auto p-4 mt-10  ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Daftar Data</h2>
                        <button onClick={() => openModal("add", null)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Tambah Data</button>
                    </div>

                    <div className=" h-[500px] overflow-y-auto rounded-x">
                        <table className="min-w-full bg-white border border-gray-200  shadow-2xl">
                            <thead className="bg-gray-100 text-left sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 border-b">Id</th>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Job</th>
                                    <th className="px-4 py-2 border-b flex justify-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((character: FormData) => (
                                    <tr key={character.id} className="hover:bg-gray-200">
                                        <td className="px-4 py-2 border-b">{character.id}</td>
                                        <td className="px-4 py-2 border-b">{character.name}</td>
                                        <td className="px-4 py-2 border-b">{character.job}</td>
                                        <td className="px-4 py-2 border-b space-x-2 flex justify-center">
                                            <button onClick={() => openModal(ModalType.EDIT, character)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm cursor-pointer">Edit</button>
                                            <button onClick={() => {
                                                openModal(ModalType.DELETE, character)
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