// EmployeeDetails.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeDetails = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 my-6">
                    <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-6 h-6">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        <Link to={"/employee"} className="text-sm text-gray-700 ml-2">
                            Back
                        </Link>
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EmployeeDetails;
