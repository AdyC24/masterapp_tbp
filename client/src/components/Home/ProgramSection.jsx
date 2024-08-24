import React from "react";


const ProgramSection = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 mx-4 mt-6">
            <Program title="Manpower Planning" detail="Tingkatkan akurasi manpower planning vs aktual secara real-time" />
            <Program title="Electronic Contract" detail="Permudah proses kontrak pekerja dengan satu kali klik" />
        </div>
    );
};

const Program = ({ title, detail }) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-lg mt-2 text-gray-600">{detail}</p>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300">Access</button>
        </div>
    );
};

export default ProgramSection