import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const loginFormSchema = z.object({
    username: z
        .string()
        .min(4, { message: "Minimal 4 Karakter bwang" })
        .max(8, { message: "Max 8 karakter, Kebayakan itu kocak!" }),
    katasandi: z
        .string()
        .min(5, { message: "Minimal 5 Karakter lah kocak, ga aman itu!" })
        .regex(/[A-Z]/, "Password harus mengandung setidaknya 1 huruf kapital"),
    age: z
        .coerce
        .number()
        .min(19, { message: "Umur minimal 19 tahun, ya!" })
})

type LoginFormSchema = z.infer<typeof loginFormSchema>


const RHFPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema)
    });

    const handleRegister = (values: LoginFormSchema) => {
        alert("Form Submitted")
        console.log(values.username)
    }

    return (
        <div>
            <h1>RHF Page</h1>

            <form
                onSubmit={form.handleSubmit(handleRegister)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}>
                <label >
                    Username:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="text" {...form.register("username")} />
                </label>
                <span style={{
                    color: "red"
                }}>{form.formState.errors.username?.message}</span>

                <label>
                    Password:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type={showPassword ? "text" : "password"} {...form.register("katasandi")} />
                </label>
                <span style={{
                    color: "red"
                }}>{form.formState.errors.katasandi?.message}</span>

                <label>
                    <input
                        type="checkbox"
                        onChange={(e) => setShowPassword(e.target.checked)} />
                    Show Password
                </label>

                <label>
                    Age:
                    <input
                        style={{
                            marginLeft: "4px"
                        }}
                        type="number" {...form.register("age")} />
                </label>
                <span style={{
                    color: "red"
                }}>{form.formState.errors.age?.message}</span>

                <button>Login</button>

            </form>
        </div>
    )
}

export default RHFPage