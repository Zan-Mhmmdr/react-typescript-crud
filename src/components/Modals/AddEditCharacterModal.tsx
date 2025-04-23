import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
    onClose: () => void
    animate: boolean
    onSubmit: (data: { name: string; job: string }) => void
    editData: { id: string; name: string; job: string }
}

const editFormSchema = z.object({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    job: z.string().optional(),
})

type EditFormSchema = z.infer<typeof editFormSchema>

const AddEditCharacterModal = ({ onClose, animate, editData, onSubmit }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormSchema>({
        resolver: zodResolver(editFormSchema)
    })

    const handleFormSubmit = (data: EditFormSchema) => {
        onSubmit(data)
        console.log("success")
    }

    return (

        <div className={`fixed flex justify-center items-center h-screen w-screen top-0 left-0 bg-black/50 z-20 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}>
            <div className={`w-1/4 gap-8 p-8 bg-white rounded shadow-lg transform transition-transform duration-300 ${animate ? "scale-100" : "scale-95"}`}>

                <button className="absolute top-2 right-3 cursor-pointer hover:text-red-500" onClick={onClose}>
                    X
                </button>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
                    <div className="flex flex-col space-y-4">
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            name="name"
                            defaultValue={editData.name}
                            placeholder="Name"
                            className="p-2 border border-gray-300 rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                        <input
                            {...register("job")}
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
    )
}

export default AddEditCharacterModal