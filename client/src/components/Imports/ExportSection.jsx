import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

const ExportSection = ({ dataType, handleExport }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg flex justify-center">
            <button
                onClick={() => handleExport(dataType)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow-md transition duration-300 flex items-center space-x-2"
            >
                <FaFileDownload />
                <span>Export {dataType}</span>
            </button>
        </div>
    );
};

export default ExportSection;