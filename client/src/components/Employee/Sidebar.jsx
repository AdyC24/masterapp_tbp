// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                <Link
                    to={'/personal/:id'}
                    className="px-6 py-2 text-md hover:bg-green-500 hover:text-white transition duration-200"
                >
                    Personal
                </Link>
                <Link
                    to={'/contract/:id'}
                    className="px-6 py-2 text-md hover:bg-green-500 hover:text-white transition duration-200"
                >
                    Contract
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
