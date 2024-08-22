import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logoutHandler = () => {
        fetch('/auth/logout', {
            method: 'POST'
        }).then(() => {
            navigate('/'); 
        }).catch(err => console.error('Logout failed', err));
    };

    return (
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
                    <Link to="/home" className="flex items-center text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300">
                        Home
                    </Link>

                    {isAuthenticated && (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                            </svg>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Logout
                                        </button>
                                        <Link to="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!isAuthenticated && (
                        <Link to="/login" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
