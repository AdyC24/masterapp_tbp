import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ExcelJS from 'exceljs';
import axios from 'axios';
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

            const formatDate = (date) => {
                if (!date) return null;
                const d = new Date(date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            };

            for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
                const row = worksheet.getRow(rowNumber);
                const rowData = row.values.filter(value => value !== null);

                // Fetch location data if locId exists
                if (rowData[2]) {
                    try {
                        const response = await axios.get(`http://localhost:4000/location/${rowData[2]}`); // Adjust the URL to your backend endpoint
                        const location = response.data.data; // Access the data property
                        rowData.push(location.locId);
                    } catch (error) {
                        console.error('Error fetching location data:', error);
                        continue; // Skip this row if location data fetch fails
                    }
                }

                // Format date values in array indices [0] and [9]
                if (rowData[0]) rowData[0] = formatDate(rowData[0]);
                if (rowData[9]) rowData[9] = formatDate(rowData[9]);

                // Concatenate data in array indices 14, 15, and 16
                if (rowData.length > 16) {
                    rowData[14] = `${rowData[14]}, RT/RW. ${rowData[15]}/${rowData[16]}`;
                    rowData.splice(15, 2); // Remove the now redundant indices
                }

                jsonData.push(rowData);
            }
            console.log(`Importing ${dataType}`, jsonData);

            // Send data to backend
            try {
                const response = await axios.post('http://localhost:4000/employee/bunch', {
                    dataType,
                    data: jsonData
                });
                console.log('Data successfully sent to backend:', response.data);
            } catch (error) {
                console.error('Error sending data to backend:', error);
            }
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

    const handleExport = async (dataType) => {
        if (dataType === 'Position Data') {
            try {
                const response = await axios.get(`http://localhost:4000/position`); // Adjust the URL to your backend endpoint
                const positions = response.data.data; // Access the data property

                if (!Array.isArray(positions)) {
                    throw new Error('Expected an array of positions');
                }

                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet(dataType);

                // Add headers
                const headerRow = worksheet.addRow(['ID', 'Position', 'Level', 'Department', 'Section', 'Division', 'Company']);
                headerRow.eachCell((cell) => {
                    cell.font = { bold: true };
                });

                // Add data
                positions.forEach(position => {
                    worksheet.addRow([position.posId, position.posName, position.levelName, position.deptName, position.secName, position.divName, position.compName]);
                });

                // Export to Excel
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${dataType}.xlsx`;
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error fetching position data:', error);
            }
        } else {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(dataType);

            // Add some sample data
            const headerRow = worksheet.addRow(['ID', 'Name', 'Position']);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true };
            });
            worksheet.addRow([1, 'John Doe', 'Manager']);
            worksheet.addRow([2, 'Jane Smith', 'Developer']);

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${dataType}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
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