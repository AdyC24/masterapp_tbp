import React, { useState, useEffect,useRef } from "react";
// import { useAuth } from "../../AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const EmployeePage = () => {
    // const { isAuthenticated } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ nik: "", name: "", position: "", department: "", company: ""});
    const [isEditing, setIsEditing] = useState(false);
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(false)

    useEffect(() => {
        fetchEmployee();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [modalRef])

    const fetchEmployee = async () => {
        try {
            const response = await axios.get('/employee');
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    }

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    }

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/employee', newEmployee)
            setEmployees([...employees, response.data])
            setNewEmployee({ nik: "", name: "", position: "", department: "", company: ""});
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    }

    const handleDeleteKaryawan = async (id) => {
        try {
            await axios.delete(`/employee/${id}`);
            setEmployees(employees.filter((employee) => employee.empId !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    const handleEditKaryawan = (employee) => {
        setIsEditing(true);
        setEditEmployeeId(employee.empId);
        setNewEmployee({ nik: employee.empNIK, name: employee.empName, position: employee.empPosition, department: employee.empDepartment, company: employee.empCompany});
    }

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/employee/${editEmployeeId}', newEmployee)
            setEmployees(
                employees.map((employee) => 
                    employee.empId === editEmployeeId ? response.data : employee
                )
            );
            setIsEditing(false)
            setEditEmployeeId(null)
            setNewEmployee({nik: "", name: "", position: "", department: "", company: ""})
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    return(
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar/>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Tambah Karyawan
                </button>

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                <div className="bg-white p-6">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {isEditing ? "Edit Karyawan" : "Tambahkan Karyawan"}
                                    </h2>
                                    <form 
                                        onSubmit={isEditing ? handleUpdateEmployee : handleCreateEmployee}
                                        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8"
                                    > 
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">NIK</label>
                                            <input 
                                                type="text" 
                                                name="nik"
                                                value={newEmployee.nik}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={newEmployee.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Jabatan</label>
                                            <input 
                                                type="text" 
                                                name="position"
                                                value={newEmployee.position}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                                            <input 
                                                type="text" 
                                                name="department"
                                                value={newEmployee.department}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                                            <input 
                                                type="text" 
                                                name="company"
                                                value={newEmployee.company}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            {isEditing ? "Update" : "Tambah"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Employee List */}
                <div className="bg-whitep-6 rounded-lg shadow-md max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold md-4">Daftar Karyawan</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">NIK</th>
                                <th className="py-2 px-4 border-b">Nama</th>
                                <th className="py-2 px-4 border-b">Jabatan</th>
                                <th className="py-2 px-4 border-b">Department</th>
                                <th className="py-2 px-4 border-b">Perusahaan</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => {
                                <tr key={employee.empId}>
                                    <td className="py-2 px-4 border-b">{employee.empNIK}</td>
                                    <td className="py-2 px-4 border-b">{employee.empName}</td>
                                    <td className="py-2 px-4 border-b">{employee.empPosition}</td>
                                    <td className="py-2 px-4 border-b">{employee.empDepartment}</td>
                                    <td className="py-2 px-4 border-b">{employee.empCompany}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEditKaryawan(employee)}
                                            className="text-blue-500 hover:text-blue-700 mr-4"    
                                        >
                                            Edit                                       
                                        </button>
                                        <button
                                            onClick={() => handleDeleteKaryawan(employee.empId)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default EmployeePage