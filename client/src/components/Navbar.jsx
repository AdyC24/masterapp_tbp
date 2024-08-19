import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="bg-white shadow-md py-4 px-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/images/logo2.png" alt="Logo" className="h-12 mr-2"/>
                </div>
                <div className="space-x-4">
                    <Link to="/home" className="text-blue-500 hover:text-blue-600">Home</Link>
                    <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;