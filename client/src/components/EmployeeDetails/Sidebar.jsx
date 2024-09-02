// Sidebar.jsx
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
    const { nik } =  useParams();
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname.includes(path)
            ? "bg-green-500 text-white"
            : " hover:bg-green-500 hover:text-white transition duration-200"
    }
    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                <Link
                    to={`/employee/${nik}/personal`}
                    className={`px-6 py-2 text-md ${getLinkClass(`/employee/${nik}/personal`)}`}
                >
                    Personal
                </Link>
                <Link
                    to={`/employee/${nik}/contract`}
                    className={`px-6 py-2 text-md ${getLinkClass(`/employee/${nik}/contract`)}`}
                >
                    Contract
                </Link>
                <Link
                    to={`/employee/${nik}/pa`}
                    className={`px-6 py-2 text-md ${getLinkClass(`/employee/${nik}/pa`)}`}
                >
                    Performance Appraisal
                </Link>
                <Link
                    to={`/employee/${nik}/sp`}
                    className={`px-6 py-2 text-md ${getLinkClass(`/employee/${nik}/sp`)}`}
                >
                    Surat Peringatan
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
