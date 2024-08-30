// EmployeeDetails.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const EmployeeDetails = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 my-6">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EmployeeDetails;
