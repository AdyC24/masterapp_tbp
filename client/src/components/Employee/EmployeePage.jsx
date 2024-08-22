import React, { useState, useEffect,useRef } from "react";
// import { useAuth } from "../../AuthContext";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";

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
            const response = await axios.get(`/employee`);
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
            const response = await axios.put(`/employee/${editEmployeeId}`, newEmployee)
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

    const openModal = () => {
        setIsEditing(false);
        setNewEmployee({ nik: "", name: "", position: "", department: "", company:"" });
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return(
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar/>
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>
                    <button 
                        onClick={openModal}
                        className="mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Tambah Karyawan
                    </button>

                    <EmployeeTable
                        employees={employees}
                        handleEditKaryawan={handleEditKaryawan}
                        handleDeleteKaryawan={handleDeleteKaryawan}
                    />     
                </div>
                <Footer />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                            {isEditing ? "Edit Karyawan" : "Tambahkan Karyawan"}
                        </h2>
                        <EmployeeForm 
                            newEmployee={newEmployee}
                            handleInputChange={handleInputChange}
                            handleSubmit={isEditing ? handleUpdateEmployee : handleCreateEmployee}
                            isEditing={isEditing}
                            closeModal={closeModal}
                        />
                    </div>
                </div>     
            )}
        </div>
    )
}

export default EmployeePage