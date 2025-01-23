import React from 'react';
import { FaFileUpload, FaFileDownload } from 'react-icons/fa';

const ImportSection = ({ dataType, fileName, handleFileChange, handleImport, downloadTemplate }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Import {dataType}</h2>
            <div className="relative mb-6">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(event) => handleFileChange(event, dataType)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 bg-white cursor-pointer">
                    {fileName}
                </div>
            </div>
            <div className="flex space-x-4 justify-between">
                <button
                    onClick={handleImport}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded shadow-md transition duration-300 flex items-center space-x-2"
                >
                    <FaFileUpload />
                    <span>Import {dataType}</span>
                </button>
                <button
                    onClick={downloadTemplate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow-md transition duration-300 flex items-center space-x-2"
                >
                    <FaFileDownload />
                    <span>Template</span>
                </button>
            </div>
        </div>
    );
};

export default ImportSection;