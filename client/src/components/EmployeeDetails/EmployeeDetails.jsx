// EmployeeDetails.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "./Sidebar";

const EmployeeDetails = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6">
                    <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Employee Details</h1>
                    <p className="text-lg text-gray-700">Ini halaman employee details</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EmployeeDetails;
