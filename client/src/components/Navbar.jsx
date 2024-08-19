import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Navbar = ({ onLogout }) => {
    const { isAuthenticated } = useAuth()
    console.log('isAuthenticated:', isAuthenticated)
    const navigate = useNavigate();

    const logoutHandler = () => {
        fetch('/auth/logout', {
            method: 'POST'
        }).then(() => {
            onLogout(); //setelah running logout, 
            navigate('/'); //navigate ke "/"
        }).catch(err => console.error('Logout failed', err))
    }
    return(
        <nav className="bg-white shadow-md py-4 px-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/images/logo2.png" alt="Logo" className="h-12 mr-2"/>
                </div>
                <div className="space-x-4">
                    <Link to="/home" className="text-blue-500 hover:text-blue-600">Home</Link>
                    {isAuthenticated ? (
                        <button onClick={logoutHandler} className="text-blue-500 hover:text-blue-600">Logout</button>
                    ) : (
                        <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;