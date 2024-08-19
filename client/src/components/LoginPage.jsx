import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()
    const [nik, setNik] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { nik, password });
            console.log("Login successful:", response.data)
            navigate('/home')
        } catch (error) {
            setErrorMessage("Login failed. Please check your NIK & password")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to bg-purple-600">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
                <h2 className="text-3xl font-extrabold text-center  text-gray-800">Sign in to your account</h2>
                <p className="text-center text-gray-500">Please enter you NIK and password</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="nik">
                            NIK
                        </label>
                        <input 
                            id="nik" 
                            type="text"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-50 focus:border-indigo-500"
                            placeholder="Enter your NIK"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter you password" 
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;