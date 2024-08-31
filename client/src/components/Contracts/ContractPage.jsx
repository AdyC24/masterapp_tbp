import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ContractPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex-grow container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Contract Management</h1>
                    <p>This is contracts page</p>
            </div>
            <Footer />
        </div>
    )
}

export default ContractPage;