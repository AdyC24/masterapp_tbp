import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ExcelJS from 'exceljs';

const ImportsPage = () => {
    const handleImport = async (dataType, file) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(event.target.result);
            const worksheet = workbook.getWorksheet(1);
            const jsonData = [];
            worksheet.eachRow((row, rowNumber) => {
                jsonData.push(row.values);
            });
            console.log(`Importing ${dataType}`, jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileChange = (event, dataType) => {
        const file = event.target.files[0];
        if (file) {
            handleImport(dataType, file);
        }
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex-grow container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Imports</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Import Employee Data</h2>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={(event) => handleFileChange(event, 'Employee Data')}
                                className="mb-4"
                            />
                            <button
                                onClick={() => document.querySelector('input[type="file"]').click()}
                                className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow-md"
                            >
                                Import Employee Data
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Import Contract Data</h2>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={(event) => handleFileChange(event, 'Contract Data')}
                                className="mb-4"
                            />
                            <button
                                onClick={() => document.querySelector('input[type="file"]').click()}
                                className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow-md"
                            >
                                Import Contract Data
                            </button>
                        </div>
                        {/* Add more sections as needed */}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ImportsPage;