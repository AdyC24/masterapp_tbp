import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const ContractPage = () => {
    const [contracts, setContracts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContracts, setSelectedContracts] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

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

    const handleSelectedAll = () => {
        if (isAllSelected) {
            setSelectedContracts([]);
        } else {
            setSelectedContracts(currentContracts.map(contract => contract.contractId));
        }
        setIsAllSelected(!isAllSelected)
    }

    const handleCheckboxChange = (id) => {
        if (selectedContracts.includes(id)) {
            setSelectedContracts(selectedContracts.filter(contractId => contractId !== id)); // Hapus jika sudah dipilih
        } else {
            setSelectedContracts([...selectedContracts, id]); // Tambahkan ke daftar yang dipilih
        }
    };
    

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

    useEffect(() => {
        setIsAllSelected(selectedContracts.length === currentContracts.length)
    }, [selectedContracts, currentContracts])

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
                        <div className="flex">
                            <Link to={"/home"} className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-gray-700">Back</p>
                            </Link>
                            <h2 className="justify-center text-3xl font-semibold mb-8">Contract Monitoring</h2>
                        </div>
                        <div className="mb-8">
                            <div className="overflow-x-auto shadow-lg rounded-lg">

                                <div className="flex justify-between items-center mb-4">
                                    <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                                        <button className="flex">
                                            Send 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                            </svg>
                                        </button>
                                    </div>
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
                                            <th className="py-3 px-2 text-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={isAllSelected}
                                                    onChange={handleSelectedAll}
                                                    className="w-4 h-4 rounded-md focus:ring-2 focus:ring-offset-2"
                                                />
                                            </th>
                                            <th className="py-3 px-6 text-left">NIK</th>
                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-left">Department</th>
                                            <th className="py-3 px-6 text-left">Level</th>
                                            <th className="py-3 px-6 text-left">Position</th>
                                            <th className="py-3 px-6 text-left">Hire Date</th>
                                            <th className="py-3 px-6 text-left">Contract</th>
                                            <th className="py-3 px-6 text-left">Expired Date</th>
                                            <th className="py-3 px-6 text-left">PA</th>
                                            <th className="py-3 px-6 text-left">SP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                    {currentContracts.map(contract => (
                                            <tr className="border-b border-gray-200 hover:bg-gray-100"> 
                                                <td className="py-3 px-2 text-center">
                                                    <input type="checkbox"
                                                    checked={selectedContracts.includes(contract.contractId)}
                                                    onChange={() => handleCheckboxChange(contract.contractId)}
                                                    className="w-3 h-3 rounded-md focus:right-2 focus:ring-offset-2"
                                                />
                                                </td>
                                                <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                                <td className="py-3 px-6 text-left">{contract.persName}</td>
                                                <td className="py-3 px-6 text-left">{contract.deptName}</td>
                                                <td className="py-3 px-6 text-left">{contract.levelCode}</td>
                                                <td className="py-3 px-6 text-left">{contract.posName}</td>
                                                <td className="py-3 px-6 text-left">{formatDate(contract.empJoinDate)}</td>
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
