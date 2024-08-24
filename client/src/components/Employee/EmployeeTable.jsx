import React from "react";

const EmployeeTable = ({ employees, handleRowClick }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr 
                            key={employee.empId}
                            className="border-b hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRowClick(employee.empId)}
                        >
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empNIK}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empName}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empPosition}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empDepartment}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">{employee.empCompany}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
