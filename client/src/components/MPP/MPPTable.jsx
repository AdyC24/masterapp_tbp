import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";

const MPPTable = () => {
    const [mppData, setMppData] = useState([]);
    const [filters, setFilters] = useState({
        posId: "",
        posName: "",
        jobName: "",
        divName: "",
        deptName: "",
        secName: "",
        compName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        posId: "",
        posName: "",
        jobName: "",
        divName: "",
        deptName: "",
        secName: "",
        compName: "",
        slot: "",
    });

    useEffect(() => {
        // Fetch MPP data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/position"); // Adjust the URL to your backend endpoint
                setMppData(response.data.data); // Access the data property
            } catch (error) {
                console.error("Error fetching MPP data:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
        setCurrentPage(1); // Reset to the first page when filters change
    };

    const filteredData = mppData.filter((mpp) =>
        Object.keys(filters).every((key) =>
            mpp[key] ? mpp[key].toString().toLowerCase().includes(filters[key].toLowerCase()) : true
        )
    );

    // Calculate pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle file upload logic here
            console.log("File uploaded:", file);
        }
    };

    const handleDownloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("MPP Data");

        // Add headers
        const headerRow = worksheet.addRow(["ID", "Position", "Job", "Level", "Department", "Sub-Department", "Unit", "Company", "Slot", "Exist", "Dev"]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
        });

        // Add data
        filteredData.forEach((mpp) => {
            worksheet.addRow([mpp.posId, mpp.posName, mpp.jobName, mpp.levelCode, mpp.divName, mpp.deptName, mpp.secName, mpp.compName]);
        });

        // Generate Excel file and trigger download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mpp_data.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleUpdateMPPClick = () => {
        fileInputRef.current.click();
    };

    const handleEditClick = (mpp) => {
        setEditData(mpp);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSave = () => {
        // Handle save logic here
        console.log("Data saved:", editData);
        setIsModalOpen(false);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-8 w-1/6 ml-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="posId"
                        placeholder="Filter ID"
                        value={filters.posId}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="posName"
                        placeholder="Filter Position"
                        value={filters.posName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="jobName"
                        placeholder="Filter Job"
                        value={filters.jobName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="deptName"
                        placeholder="Filter Department"
                        value={filters.deptName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="secName"
                        placeholder="Filter Section"
                        value={filters.secName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="divName"
                        placeholder="Filter Division"
                        value={filters.divName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="compName"
                        placeholder="Filter Company"
                        value={filters.compName}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                    >
                        Download Excel
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <button
                        onClick={handleUpdateMPPClick}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                    >
                        Update MPP
                    </button>
                </div>
            </div>
            <div className="w-full p-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manpower Planning Table</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">ID</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Position</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Job</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Level</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Department</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Sub-Department</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Unit</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Company</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Slot</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Exist</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Dev</th>
                                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((mpp) => (
                                <tr key={mpp.posId} className="hover:bg-gray-100 transition duration-200">
                                    <td className="py-3 px-4 border-b">{mpp.posId}</td>
                                    <td className="py-3 px-4 border-b">{mpp.posName}</td>
                                    <td className="py-3 px-4 border-b">{mpp.jobName}</td>
                                    <td className="py-3 px-4 border-b">{mpp.levelCode}</td>
                                    <td className="py-3 px-4 border-b">{mpp.divName}</td>
                                    <td className="py-3 px-4 border-b">{mpp.deptName}</td> 
                                    <td className="py-3 px-4 border-b">{mpp.secName}</td>
                                    <td className="py-3 px-4 border-b">{mpp.compName}</td>
                                    <td className="py-3 px-4 border-b">{mpp.slot}</td>
                                    <td className="py-3 px-4 border-b">{mpp.exist}</td>
                                    <td className="py-3 px-4 border-b">{mpp.dev}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button
                                            onClick={() => handleEditClick(mpp)}
                                            className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Total Records: {filteredData.length}</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit MPP</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">ID</label>
                            <input
                                type="text"
                                name="posId"
                                value={editData.posId}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Position</label>
                            <input
                                type="text"
                                name="posName"
                                value={editData.posName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Job</label>
                            <input
                                type="text"
                                name="jobName"
                                value={editData.jobName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Department</label>
                            <input
                                type="text"
                                name="divName"
                                value={editData.divName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Sub-Department</label>
                            <input
                                type="text"
                                name="deptName"
                                value={editData.deptName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Unit</label>
                            <input
                                type="text"
                                name="secName"
                                value={editData.secName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Company</label>
                            <input
                                type="text"
                                name="compName"
                                value={editData.compName}
                                onChange={handleEditChange}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalSave}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MPPTable;