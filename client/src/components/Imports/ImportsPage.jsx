import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ExcelJS from 'exceljs';
import ImportSection from './ImportSection';
import ExportSection from './ExportSection';

const ImportsPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataType, setDataType] = useState('');
    const [employeeFileName, setEmployeeFileName] = useState('Choose File');
    const [contractFileName, setContractFileName] = useState('Choose File');

    const handleImport = async () => {
        if (!selectedFile || !dataType) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(event.target.result);
            const worksheet = workbook.getWorksheet(1);
            const jsonData = [];
            worksheet.eachRow((row, rowNumber) => {
                const rowData = row.values.filter(value => value !== null);
                jsonData.push(rowData);
            });
            console.log(`Importing ${dataType}`, jsonData);
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    const handleFileChange = (event, dataType) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setDataType(dataType);
            if (dataType === 'Employee Data') {
                setEmployeeFileName(file.name);
            } else if (dataType === 'Contract Data') {
                setContractFileName(file.name);
            }
        }
    };

    const handleExport = (dataType) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(dataType);

        // Add some sample data
        worksheet.addRow(['ID', 'Name', 'Position']);
        worksheet.addRow([1, 'John Doe', 'Manager']);
        worksheet.addRow([2, 'Jane Smith', 'Developer']);

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${dataType}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    };

    const downloadTemplate = async () => {
        const response = await fetch('/assets/Employee_Template.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        // Optionally, you can modify the workbook here if needed

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Employee_Import_Template.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex-grow container mx-auto py-12">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Data Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <ImportSection
                        dataType="Employee Data"
                        fileName={employeeFileName}
                        handleFileChange={handleFileChange}
                        handleImport={handleImport}
                        downloadTemplate={downloadTemplate}
                    />
                    <ImportSection
                        dataType="Contract Data"
                        fileName={contractFileName}
                        handleFileChange={handleFileChange}
                        handleImport={handleImport}
                        downloadTemplate={downloadTemplate}
                    />
                </div>
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 mt-16">Exports</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ExportSection dataType="Position Data" handleExport={handleExport} />
                    <ExportSection dataType="Employee Data" handleExport={handleExport} />
                    <ExportSection dataType="Contract Data" handleExport={handleExport} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ImportsPage;