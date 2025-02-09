import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewEmployeeModal from "./Modal/NewEmployeeModal";

const EmployeeTable = ({ employees, handleRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Jumlah item per halaman
    const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Menghitung total halaman berdasarkan data yang difilter
    const filteredEmployees = employees.filter(employee =>
        employee.empNik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.persName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.posName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.secName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.compName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    // Menentukan indeks awal dan akhir untuk data di halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function Search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset halaman ke 1 saat pencarian dilakukan
    };

    // Function Modal
    const openModal = () => setIsModalOpen(true)

    return (
        <div className="overflow-x-auto">
            <div className="w-max">
                <Link to="/home" className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-gray-700 ml-2">Back</p>
                </Link>
            </div>
            <div className="pl-6 flex justify-between items-center mb-4 mt-2">
                
                {/* Modal Add New Employee */}
                <button 
                    onClick={openModal}
                    className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow-md">
                    Add New
                </button>
                <NewEmployeeModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Employee..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-1/4" // Atur width menjadi lebih kecil
                />
                
            </div>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">NIK</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Position</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Department</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Company</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Last Contract</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map(employee => (
                        <tr
                            key={employee.empId}
                            className="border-b hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRowClick(employee.empNik)}
                        >
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empNik}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.persName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.posName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.secName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.compName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.contractType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
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
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeTable;
