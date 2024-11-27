// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname.includes(path)
            ? "bg-green-500 text-white"
            : "hover:bg-green-500 hover:text-white transition duration-200";
    };

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 mb-2 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                <Link
                    to="/contracts/dashboard"
                    className={`px-6 pt-4 pb-2 text-lg font-semibold ${getLinkClass(`/contracts/dashboard`)}`}
                >
                    DASHBOARD
                </Link>
                <Link
                    to="/contracts/list"
                    className={`px-6 py-1 text-md ${getLinkClass(`/contract/list`)}`}
                >
                    Contract List
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
