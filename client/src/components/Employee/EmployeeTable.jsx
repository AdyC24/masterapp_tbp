import React, { useState } from "react";

const EmployeeTable = ({ employees, handleRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Jumlah item per halaman

    // Menghitung total halaman
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // Menentukan indeks awal dan akhir untuk data di halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

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

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">NIK</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Nama</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Jabatan</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Department</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Perusahaan</th>
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
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empName}</td>
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
