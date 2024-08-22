import React from "react";

const EmployeeTable = ({ employees, handleEditKaryawan, handleDeleteKaryawan }) => {
    return(
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
                            {employees.map(employee => (
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
                            )
                            )}
                        </tbody>
                    </table>
    )

}

export default EmployeeTable