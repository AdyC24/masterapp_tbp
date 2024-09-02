import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";


const ContractPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6 mb-2">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContractPage


