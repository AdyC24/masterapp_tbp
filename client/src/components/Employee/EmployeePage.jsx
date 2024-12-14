import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EmployeeTable from "./EmployeeTable";

const EmployeePage = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([]);
    

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try { 
            const response = await axios.get(`http://localhost:4000/employee`);
            setEmployees(response.data.data)
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    }

    const handleRowClick = (empNik) => {
        navigate(`/employee/${empNik}/personal`)
    }

    return(
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar/>
                <div className="flex-grow container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>

                    <EmployeeTable
                        employees={employees}
                        handleRowClick={handleRowClick}
                    />     
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default EmployeePage