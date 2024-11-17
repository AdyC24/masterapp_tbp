// Personal.jsx
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Personal = () => {
    const [personal, setPersonals] = useState([])

    const { nik } = useParams()

    const fetchPersonal = useCallback(
        async () => {
            try {
                const response = await axios.get(`http://localhost:4000/employee/${nik}`)
                setPersonals(response.data.data)
            } catch (error) {
                console.error("Error fetching personalL", error)
            }
        }, [nik]);

    useEffect(() => {
        fetchPersonal();
    }, [fetchPersonal]);

    // Dummy data to simulate fetched employee data
    // const dummyEmployeeData = {
    //     nik: "02D24000045",
    //     name: "Ady Candra",
    //     gender: "Laki-laki",
    //     email: "adychandra101@gmail.com",
    //     phone: "+6281234567890",
    //     address: "Jl. Murjani II, Berau, Kalimantan Timur",
    //     birthdate: "24 December 1992",
    //     age: "31",
    //     ktpNumber: "6403052412920001",
    //     kkNumber: "646403052012170009",
    //     company: "PT. Gane Permai Sentosa",
    //     site: "Loji",
    //     department: "HR & GA",
    //     position: "HR Operation Officer",
    //     level: "II",
    //     workStatus: "Contract",
    //     poh: "Samarinda",
    //     residential: "Camp Residence",
    //     hireDate: "24 November 2023",
    //     workingDate: "24 November 2023",
    //     salaryLocation: "Non Local",
    //     savingAccount: "065831938",
    //     savingBank: "Bank Negara Indonesia",
    //     npwp: "835700949727000",
    //     religion: "Islam",
    //     education: "S1",
    //     major: "Pendidikan Bahasa Inggris",
    //     gender: "Laki-laki",
    //     birthplace: "Berau",
    //     marital: "K-3",
    //     spouse: "Devi Eka Maryati",
    //     father: "Burhanuddin, S.E",
    //     mother: "Ida Norsanti",
    //     child1: "Princessa Cherish Fredella Chandra",
    //     child2: "Azelea Kevia Chandra",
    //     child3: "Givenly Faris Devara Chandra",
    //     emergencyContact: "Devi Eka Maryati",
    //     emergencyPhone: "+6280987654321"
    
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
                        <div className="col-span-3">{employeeData.name}</div>
                        <div>
                            <strong>KTP:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.ktpNumber}</div>
                        <div>
                            <strong>Gender:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.gender}</div>
                        <div>
                            <strong>Email:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.email}</div>
                        <div>
                            <strong>Phone:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.phone}</div>
                        <div>
                            <strong>Birthplace:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.birthplace}</div>
                        <div>
                            <strong>Birthdate:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.birthdate}</div>
                        <div>
                            <strong>Age:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.age}</div>
                        <div>
                            <strong>Gender:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.gender}</div>
                        <div>
                            <strong>Religion:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.religion}</div>
                        <div>
                            <strong>Education:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.education} - {employeeData.major}</div>
                        <div>
                            <strong>Emergency Call:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.emergencyContact} / {employeeData.emergencyPhone}</div>
                        <div className="col-span-8">
                            <strong>Address:</strong>
                        </div>
                        <div className="col-span-8">{employeeData.address}</div>
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
                        <div className="col-span-3">{employeeData.nik}</div>
                        <div>
                            <strong>Company:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.company}</div>
                        <div>
                            <strong>Site:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.site}</div>
                        <div>
                            <strong>Department:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.department}</div>
                        <div>
                            <strong>Position:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.position}</div>
                        <div>
                            <strong>Level:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.level}</div>
                        <div>
                            <strong>Status:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.workStatus}</div>
                        <div>
                            <strong>Point of Hire:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.poh}</div>
                        <div>
                            <strong>Date of Working:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.workingDate}</div>
                        <div>
                            <strong>Date of Hire:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.hireDate}</div>
                        <div>
                            <strong>Residential:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.residential}</div>
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
                        <div className="col-span-3">{employeeData.marital}</div>
                        <div>
                            <strong>KK:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.kkNumber}</div>
                        <div>
                            <strong>Spouse's Name:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.spouse}</div>
                        <div>
                            <strong>Child 1:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.child1}</div>
                        <div>
                            <strong>Child 3:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.child3}</div>
                        <div>
                            <strong>Child 2:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.child2}</div>
                        <div>
                            <strong>Father's Name:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.father}</div>
                        <div>
                            <strong>Mother's Name:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.mother}</div>
                    </div>
                </div>
            </div>
            {/* Payroll Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Payroll Information</h2>
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
                            <strong>Saving Account:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.savingAccount}</div>
                        <div>
                            <strong>Saving Bank:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.savingBank}</div>
                        <div>
                            <strong>Salary Location:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.salaryLocation}</div>
                        <div>
                            <strong>NPWP:</strong>
                        </div>
                        <div className="col-span-3">{employeeData.npwp}</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Personal;
