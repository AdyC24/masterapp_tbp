import React from "react";


const ProgramSection = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-20">
            <Program title="Manpower Planning" detail="Tingkatkan akurasi manpower planning vs aktual secara real-time"/>
            <Program title="Electronic Contract" detail="Permudah proses kontrak pekerja dengan satu kali klik"/>
        </div>
    );
};

const Program = ({ title, detail }) => {
    return (
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-lg mt-2 text-gray-600">{detail}</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Access</button>
        </div>
    );
};

export default ProgramSection