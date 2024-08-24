import React, { useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EmployeeTable from "./EmployeeTable";

const EmployeePage = () => {
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

    return(
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar/>
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>

                    <EmployeeTable
                        employees={employees}
                    />     
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default EmployeePage