import React from "react";

const FormData = () => {
    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ambil elemen form

        // Buat instance FormData dan masukkan data form

        // Kirim data form ke server dengan fetch
        fetch('upload', {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => console.log("Upload data success:", data))
            .catch(error => console.error("Error:", error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" />
            </label>

            <label>
                Password:
                <input type="password" name="password" />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}

export default FormData;
