type props = {
    onClose: () => void;
    animate: boolean
    onSubmit: (data: { name: string; job: string }) => void
}


const AddCharacterModal = ({ animate, onClose, onSubmit }: props) => {
    return (
        <div className={`fixed flex justify-center items-center h-screen w-screen top-0 left-0 bg-black/50 z-20 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}>
            <div className={`w-1/4 gap-8 p-8 bg-white rounded shadow-lg transform transition-transform duration-300 ${animate ? "scale-100" : "scale-95"}`}>
                {/* isi modal */}

                <button className="absolute top-2 right-3 cursor-pointer hover:text-red-500" onClick={onClose}>
                    X
                </button>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const name = formData.get('name') as string
                    const job = formData.get('job') as string
                    onSubmit({ name, job })
                }} className="w-full ">
                    <div className="flex flex-col space-y-4">
                        <input type="text" name="name" placeholder="Name" className="p-2 border border-gray-300 rounded" />
                        <input type="text" name="job" placeholder="Job" className="p-2 border border-gray-300 rounded" />
                        <button type="submit" className="bg-black w-full text-white font-bold px-4 py-2 rounded cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCharacterModal;