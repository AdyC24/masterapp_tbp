import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(null);
    const hrPlanningRef = useRef(null);
    const hrOperationRef = useRef(null);
    const userProfileRef = useRef(null);
    const irRef = useRef(null);
    const combenRef = useRef(null);
    const finRef = useRef(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(prevDropdown => (prevDropdown === dropdown ? null : dropdown));
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (openDropdown === 'HRPlanning' && hrPlanningRef.current && !hrPlanningRef.current.contains(event.target)) ||
                (openDropdown === 'HROperation' && hrOperationRef.current && !hrOperationRef.current.contains(event.target)) ||
                (openDropdown === 'userProfile' && userProfileRef.current && !userProfileRef.current.contains(event.target))
            ) {
                setOpenDropdown(null);
            }
        };
        if (openDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

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
                    <img src="/images/logo2.png" alt="Logo" className="h-12" />
                </div>

                {/* Center Section: HR Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* <div className="relative" ref={hrPlanningRef}>
                        <button onClick={() => toggleDropdown('HRPlanning')} className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                            HR Planning
                        </button>
                        {openDropdown === 'HRPlanning' && (
                            <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50">
                                <Link to={"/so"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Struktur Organisasi
                                </Link>
                                <Link to={"/ptk"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Permintaan Tenaga Kerja
                                </Link>
                            </div>
                        )}
                    </div> */}
                    {/* <div className="border-l border-gray-300 h-6"></div> */}
                    <div className="relative" ref={hrOperationRef}>
                        <button onClick={() => toggleDropdown('HROperation')} className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                            HR Operation
                        </button>
                        {openDropdown === 'HROperation' && (
                            <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50">
                                <Link to={"/employee"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Employee Management
                                </Link>
                                <Link to={"/contracts/dashboard"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Contract Management
                                </Link>
                                <Link to={"/imports"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Imports
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="border-l border-gray-300 h-6"></div>
                    <Link to="/hirs" className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                        HRIS
                    </Link>
                    <div className="border-l border-gray-300 h-6"></div>
                    <div className="relative" ref={irRef}>
                        <button onClick={() => toggleDropdown('IR')} className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                            Industrial Relations
                        </button>
                        {/* {openDropdown === 'IR' && (
                            <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50">
                                <Link to={"/sp"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Surat Peringatan
                                </Link>
                            </div>
                        )} */}
                    </div>
                    <div className="border-l border-gray-300 h-6"></div>
                    <div className="relative" ref={combenRef}>
                        <button onClick={() => toggleDropdown('comben')} className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                            Compensation & Benefit
                        </button>
                    </div>
                    <div className="border-l border-gray-300 h-6"></div>
                    <div className="relative" ref={finRef}>
                        <button onClick={() => toggleDropdown('finance')} className="text-green-600 font-semibold text-lg hover:text-green-800 transition duration-300">
                            Finance
                        </button>
                    </div>
                </div>

                {/* Right Section: Navigation Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="flex items-center text-gray-700 font-semibold text-lg hover:text-green-800 transition duration-300">
                        Home
                    </Link>

                    {isAuthenticated && (
                        <div className="relative" ref={userProfileRef}>
                            <button 
                                onClick={() => toggleDropdown('userProfile')} 
                                className="flex items-center focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {openDropdown === 'userProfile' && (
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
                        <Link to="/login" className="text-gray-700 font-semibold text-lg hover:text-green-800 transition duration-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
