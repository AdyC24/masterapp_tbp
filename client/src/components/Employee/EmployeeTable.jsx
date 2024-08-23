import React from "react";

const EmployeeTable = ({ employees, handleEditKaryawan, handleDeleteKaryawan }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">NIK</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Nama</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Jabatan</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Department</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Perusahaan</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.empId} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empNIK}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empPosition}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empDepartment}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empCompany}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">
                                <button
                                    onClick={() => handleEditKaryawan(employee)}
                                    className="text-yellow-500 hover:text-yellow-700 mr-4 font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteKaryawan(employee.empId)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
