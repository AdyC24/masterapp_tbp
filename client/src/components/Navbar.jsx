import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();

    const logoutHandler = () => {
        fetch('/auth/logout', {
            method: 'POST'
        }).then(() => {
            navigate('/'); //navigate ke "/"
        }).catch(err => console.error('Logout failed', err))
    }
    return(
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-8">
                {/* Left Section: Logo */}
                <div className="flex items-center space-x-4">
                    <img src="/images/logo2.png" alt="Logo" className="h-12"/>
                </div>

                {/* Center Section: Karyawan Link */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/employee" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300">
                        Karyawan
                    </Link>
                </div>

                {/* Right Section: Navigation Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300">Home</Link>
                    {isAuthenticated ? (
                        <button 
                            onClick={logoutHandler} 
                            className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;