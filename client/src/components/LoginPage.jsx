import React, {useEffect, useState} from "react";
import axios from "axios";

function LoginPage() {

    const [backend, setBackend] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:4000/api")
            .then(response => response.json())
            .then(data => setBackend(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const [nik, setNik] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { nik, password });
            console.log("Login successful:", response.data)
            //redirect ke halaman home

        } catch (error) {
            setErrorMessage("Login failed. Please check your NIK & password")
        }

        console.log("NIK:", nik)
        console.log("Password:", password)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            id="nik" 
                            type="text"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your NIK"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter you password" 
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;