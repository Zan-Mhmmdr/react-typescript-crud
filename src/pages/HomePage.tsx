const HomePage = () => {
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Daftar Data</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tambah Data</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b">Nama</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">1</td>
                                <td className="px-4 py-2 border-b">Akane Yuki</td>
                                <td className="px-4 py-2 border-b">akane@example.com</td>
                                <td className="px-4 py-2 border-b space-x-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default HomePage