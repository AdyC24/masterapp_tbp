import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const ContractPage = () => {
    const [contracts, setContracts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const filterContracts = contracts.filter(contract => 
        contract.empNik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.persName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filterContracts.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentContracts = filterContracts.slice(indexOfFirstItem, indexOfLastItem)

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

    const fetchContract = useCallback(
        async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contract`);
                setContracts(response.data.data) 
            } catch (error) {
                console.error("Error fetching contract:", error)
            }
        }, []);
    
    useEffect(() => {
        fetchContract();
    }, [fetchContract]);

    const formatDate = (isDate) => {
        const date = new Date(isDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }    
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div id="contractTable" className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6 mb-2">
                    <div>
                        <h2 className="text-3xl font-semibold mb-8">Contracts</h2>
                        <div className="mb-8">
                            <div className="overflow-x-auto shadow-lg rounded-lg">

                                {/* Search */}
                                <div className="flex justify-end items-center mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="Cari karyawan..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-1/4"
                                    />
                                </div>

                                <table className="min-w-full bg-white border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">NIK</th>
                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-left">Level</th>
                                            <th className="py-3 px-6 text-left">Position</th>
                                            <th className="py-3 px-6 text-left">Hire Date</th>
                                            <th className="py-3 px-6 text-left">Contract</th>
                                            <th className="py-3 px-6 text-left">Expired Date</th>
                                            <th className="py-3 px-6 text-left">PA</th>
                                            <th className="py-3 px-6 text-left">SP</th>
                                            <th className="py-3 px-6 text-left">Sign</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                    {currentContracts.map(contract => (
                                            <tr className="border-b border-gray-200 hover:bg-gray-100"> 
                                                <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                                <td className="py-3 px-6 text-left">{contract.persName}</td>
                                                <td className="py-3 px-6 text-left">{contract.levelCode}</td>
                                                <td className="py-3 px-6 text-left">{contract.posName}</td>
                                                <td className="py-3 px-6 text-left">hire date</td>
                                                <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                                <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                                        {/* {contract.contractPA} */}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                                    {/* {contract.contractSP} */}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                                        {/* {contract.contractSign} */}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'}`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disable={currentPage === totalPages}
                                        className={`px-4 py-2 text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContractPage;
