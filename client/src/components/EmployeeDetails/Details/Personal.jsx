// Personal.jsx
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate, genderReveal } from "./dateUtils";


const Personal = () => {
    const [personal, setPersonals] = useState([])

    const { nik } = useParams()

    const fetchPersonal = useCallback(async () => {
        try {
            const personal = await axios.get(`http://localhost:4000/employee/${nik}`);
            if (JSON.stringify(personal.data.data) !== JSON.stringify(personal)) {
                setPersonals(personal.data.data);
            }
        } catch (error) {
            console.error("Error fetching personal", error);
        }
    }, [nik]);
    

    useEffect(() => {
        fetchPersonal();
    });
    
    return (
        <div>
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                    <div>
                        <button className="bg-gray-500 text-white text-xs px-6 py-1 h-8 rounded hover:bg-gray-400 transition-colors duration-300 mx-2"
                        >
                            Log
                        </button>
                        <button className="bg-green-600 text-white text-xs px-6 py-1 h-8 rounded hover:bg-green-500 transition-colors duration-300 mx-2"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-8 gap-x-6 gap-y-2 text-gray-700">
                        <div>
                            <strong>Name:</strong>
                        </div>
                        <div className="col-span-3">{personal.persName}</div>
                        <div>
                            <strong>KTP:</strong>
                        </div>
                        <div className="col-span-3">{personal.perNik}</div>
                        <div>
                            <strong>Gender:</strong>
                        </div>
                        <div className="col-span-3">{genderReveal(personal.persGender)}</div>
                        <div>
                            <strong>Phone:</strong>
                        </div>
                        <div className="col-span-3">{personal.persPhoneNum}</div>
                        <div>
                            <strong>Birthplace:</strong>
                        </div>
                        <div className="col-span-3">{personal.persBirthPlace}</div>
                        <div>
                            <strong>Birthdate:</strong>
                        </div>
                        <div className="col-span-3">{formatDate(personal.persBirthDate)}</div>
                        <div>
                            <strong>Email:</strong>
                        </div>
                        <div className="col-span-3">{personal.persEmail}</div>
                        <div className="col-span-8">
                            <strong>Address:</strong>
                        </div>
                        <div className="col-span-8">{personal.persAddress}</div>
                    </div>
                </div>
            </div>
            {/* Working Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Works Information</h2>
                    <div>
                        <button className="bg-gray-500 text-white text-xs px-6 py-1 h-8 rounded hover:bg-gray-400 transition-colors duration-300 mx-2"
                        >
                            Log
                        </button>
                        <button className="bg-green-600 text-white text-xs px-6 py-1 h-8 rounded hover:bg-green-500 transition-colors duration-300 mx-2"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="grid grid-cols-8 gap-x-6 gap-y-2 text-gray-700">
                        <div>
                            <strong>NIK:</strong>
                        </div>
                        <div className="col-span-3">{personal.empNik}</div>
                        <div>
                            <strong>Company:</strong>
                        </div>
                        <div className="col-span-3">{personal.compName}</div>
                        <div>
                            <strong>Site:</strong>
                        </div>
                        <div className="col-span-3">{personal.locName}</div>
                        <div>
                            <strong>Department:</strong>
                        </div>
                        <div className="col-span-3">{personal.deptName}</div>
                        <div>
                            <strong>Position:</strong>
                        </div>
                        <div className="col-span-3">{personal.posName}</div>
                        <div>
                            <strong>Level:</strong>
                        </div>
                        <div className="col-span-3">{personal.levelCode}</div>
                        <div>
                            <strong>Status:</strong>
                        </div>
                        <div className="col-span-3">Kontrak/Tetap</div>
                        <div>
                            <strong>Point of Hire:</strong>
                        </div>
                        <div className="col-span-3">{personal.pohName}</div>
                        <div>
                            <strong>Date of Hire:</strong>
                        </div>
                        <div className="col-span-3">{formatDate(personal.empJoinDate)}</div>
                    </div>
                </div>
            </div>
            {/* Marital Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Marital Information</h2>
                    <div>
                        <button className="bg-gray-500 text-white text-xs px-6 py-1 h-8 rounded hover:bg-gray-400 transition-colors duration-300 mx-2"
                        >
                            Log
                        </button>
                        <button className="bg-green-600 text-white text-xs px-6 py-1 h-8 rounded hover:bg-green-500 transition-colors duration-300 mx-2"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="grid grid-cols-8 gap-x-6 gap-y-2 text-gray-700">
                        <div>
                            <strong>Marital Status:</strong>
                        </div>
                        <div className="col-span-3">{personal.famMaritalStatus}</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Personal;
