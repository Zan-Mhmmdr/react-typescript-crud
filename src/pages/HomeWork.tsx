import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerFormShema = z.object({
    username: z
        .string()
        .min(4, { message: "Username minimal 3 karakter!" })
        .max(9, { message: "Username maksimal 9 karakter!" }),
    password: z
        .string()
        .min(5, { message: "Password minimal 5 karakter" }),
    email: z
        .string(),
    age: z
        .coerce
        .number()
        .min(18, { message: "Usia minimal 18 tahun" })
})

type RegisterFormSchema = z.infer<typeof registerFormShema>

const HomeWork = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormShema)
    })

    const handleRegisterSubmit = (values: RegisterFormSchema) => {
        alert('Submitted!')
        console.log(values)
    }

    return (
        <div >
            <h2>HOME WORK</h2>
            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }} onSubmit={handleSubmit(handleRegisterSubmit)}>
                <label>
                    Username:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="text" {...register("username")} />
                </label>
                <span style={{
                    color: "red"
                }}>{formState.errors.username?.message}</span>

                <label>
                    Password:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type={showPassword ? "text" : "password"} {...register("password")} />
                </label>
                <span style={{
                    color: "red"
                }}>{formState.errors.password?.message}</span>

                <label>
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="checkbox"
                        onChange={(e) => setShowPassword(e.target.checked)} />
                    Show Password
                </label>

                <label>
                    Email:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="email" {...register("email")} />
                </label>
                <span style={{
                    color: "red"
                }}>{formState.errors.email?.message}</span>

                <label>
                    Age:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="number" {...register("age")} />
                </label>
                <span style={{
                    color: "red"
                }}>{formState.errors.age?.message}</span>

                <button>Register</button>
            </form>
        </div>
    )
}

export default HomeWork