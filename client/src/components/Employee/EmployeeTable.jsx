import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees, handleRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Jumlah item per halaman
    const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [step, setStep] = useState(1);

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
    // const closeModal = () => setIsModalOpen(false)

    // Function section modal
    const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 2));
    const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

    return (
        <div className="overflow-x-auto">
            <div>
                <Link to={"/home"} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-gray-700">Back</p>
                </Link>
            </div>
            <div className="pl-6 flex justify-between items-center mb-4 mt-2">
                {/* Modal Add New Employee */}
                <button 
                    onClick={openModal}
                    className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow-md">
                    Add New
                </button>
                {isModalOpen && (
                    <><div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Employee</h2>
                            <form>
                                {step === 1 && (
                                    <div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ktpNo">
                                                KTP Number
                                            </label>
                                            <input
                                                type="number"
                                                id="ktpNo"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter KTP Number" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Name" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
                                                Gender
                                            </label>
                                            <div className="flex justify-around">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="male"
                                                        name="gender"
                                                        value="L"
                                                        className="w-4 h-4 border-gray-500 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 transition duration-300"
                                                    />
                                                    <label htmlFor="male" className="text-gray-700 text-sm p-2">Male</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="female"
                                                        name="gender"
                                                        value="P"
                                                        className="w-4 h-4 border-gray-500 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 transition duration-300"
                                                    />
                                                    <label htmlFor="female" className="text-gray-700 text-sm p-2">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthPlace">
                                                Birth Place
                                            </label>
                                            <input
                                                type="date"
                                                id="name"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Birth Place" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthDate">
                                                Birth Date
                                            </label>
                                            <input
                                                type="date"
                                                id="name"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Birth Date" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Address" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="village">
                                                Village
                                            </label>
                                            <input
                                                type="text"
                                                id="village"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Village" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="region">
                                                Region
                                            </label>
                                            <input
                                                type="text"
                                                id="region"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Region" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter City" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mariageStatus">
                                                Mariage Status
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="TK/0">TK/0</option>
                                                <option value="TK/1">TK/1</option>
                                                <option value="TK/2">TK/2</option>
                                                <option value="TK/3">TK/3</option>
                                                <option value="K/0">K/0</option>
                                                <option value="K/1">K/1</option>
                                                <option value="K/2">K/2</option>
                                                <option value="K/3">K/3</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                id="phoneNumber"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Phone Number" />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>                                        
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nik">
                                                NIK
                                            </label>
                                            <input
                                                type="text"
                                                id="nik"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter NIK" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="company">
                                                Company
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Company</option>
                                                {/* Fetch company id */}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="department">
                                                Department
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Department</option>
                                                {/* Fetch map department id based on company id dari select company*/}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="postion">
                                                Level
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Level</option>
                                                {/* Fetch map level id based on company id dari select department*/}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="postion">
                                                Position
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Position</option>
                                                {/* Fetch map position id based on company id dari select level*/}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="doh">
                                                Date of Hire
                                            </label>
                                            <input
                                                type="date"
                                                id="doh"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Date of Hire" />
                                        </div>
                                    </div>
                                )}
                                {/* Action Buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className={`${step === 1 ? "hidden" : ""} bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className={`${step === 2 ? "hidden" : ""} bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded`}
                                    >
                                        Next
                                    </button>
                                    {step === 2 && (
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div></>
                )}
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
