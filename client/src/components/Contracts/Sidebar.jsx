// Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
    const [pics, setPics] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchPics();
    }, []);

    const fetchPics = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/pic`);
            setPics(response.data.data);
        } catch (error) {
            console.error("Error fetching pic data:", error);
        }
    };

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
                    className={`px-6 pt-4 pb-2 text-xl font-semibold ${getLinkClass(`/contracts/dashboard`)}`}
                >
                    DASHBOARD
                </Link>
                {pics.map((dept, index) => (
                    <Link
                        key={dept.picName}
                        to={`/contracts/${dept.picNick}`}
                        className={`px-6 py-1 text-md ${getLinkClass(`/contracts/${dept.picNick}`)}`}
                    >
                        {dept.picName}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
