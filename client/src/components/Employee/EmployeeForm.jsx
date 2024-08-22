import React from "react";

const EmployeeForm = ({ newEmployee, handleInputChange, handleSubmit, isEditing, closeModal }) => {
    return(
        <form onSubmit={handleSubmit}> 
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
    )
}

export default EmployeeForm