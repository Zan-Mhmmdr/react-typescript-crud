import { useFetchCharacter } from "../services/useFetchCharacter"

type FormData = {
    id: string,
    name: string,
    job: string,
}

const HomePage = () => {
    const { data } = useFetchCharacter()

    return (
        <div>
            <div className="container w-3xl mx-auto p-4 mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Daftar Data</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tambah Data</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b">Nama</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b flex justify-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((character: FormData) => (
                                <tr key={character.id} className="hover:bg-gray-200">
                                    <td className="px-4 py-2 border-b">1</td>
                                    <td className="px-4 py-2 border-b">{character.name}</td>
                                    <td className="px-4 py-2 border-b">{character.job}</td>
                                    <td className="px-4 py-2 border-b space-x-2 flex justify-center">
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HomePage