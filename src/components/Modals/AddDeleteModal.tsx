type Props = {
    onClose: () => void
    onSubmit: (data: { id: string }) => void
    animate: boolean
    confirmDeleteId: string | null
}

const AddCharacterDeleteModal = ({ onClose, onSubmit, animate, confirmDeleteId}: Props) => {
    if (!confirmDeleteId) return null

    return (
        <div className={`fixed inset-0 z-30 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white rounded p-6 w-[90%] max-w-sm shadow-lg transform transition-transform duration-300 ${animate ? "scale-100" : "scale-95"}`}>
                <h2 className="text-xl font-bold mb-4">Yakin ingin menghapus?</h2>
                <p className="text-gray-600 mb-6">Data yang dihapus tidak bisa dikembalikan.</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Batal</button>
                    <button onClick={() => onSubmit({ id: confirmDeleteId })} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Hapus</button>
                </div>
            </div>
        </div>
    )
}

export default AddCharacterDeleteModal