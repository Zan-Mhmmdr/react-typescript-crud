import { useState } from "react";

const FormPage = () => {
    // Uncontrolled Component/Input
    // const inputUsernameRef = useRef<HTMLInputElement>(null)
    // const inputEmailRef = useRef<HTMLInputElement>(null)

    // Controlled Component/input
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [usernameErrorMessege, setUsernameErrorMessege] = useState("")
    const [passwordErrorMessege, setPasswordErrorMessege] = useState("")

    const handleSubmit = () => {
        // const usernameFormValue = inputUsernameRef.current?.value
        // const emailFormValue = inputEmailRef.current?.value
    }

    return (
        <>
            <h1>Form Page</h1>
            <h1>Username: {usernameInput}</h1>
            <h1>Password: {passwordInput}</h1>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px"
            }}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={(e) => {
                    setUsernameInput(e.target.value)

                    const usernameValidation = e.target.value.length < 4;

                    if (usernameValidation) {
                        setUsernameErrorMessege("Username must be at least 3 characters")
                    } else {
                        setUsernameErrorMessege("")
                    }

                }} value={usernameInput} />
                <span style={{ color: "red" }}>{usernameErrorMessege}</span>

                <label htmlFor="email">Password: </label>
                <input type="password" id="email" onChange={(e) => {
                    setPasswordInput(e.target.value)

                    const passwordValidation = e.target.value.length < 4;

                    if (passwordValidation) {
                        setPasswordErrorMessege("Password must be at least 8 characters")
                    } else {
                        setPasswordErrorMessege("")
                    }

                }} value={passwordInput} />
                <span style={{ color: "red" }}>{passwordErrorMessege}</span>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}

export default FormPage