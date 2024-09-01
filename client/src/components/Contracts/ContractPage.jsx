import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";


const ContractPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <h1 className="text-3xl font-bold mb-2 pt-8 text-center">Contract Management</h1>
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6 mb-2">
                    Here contracts data
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContractPage


