// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname.includes(path)
            ? "bg-green-500 text-white"
            : "hover:bg-green-500 hover:text-white transition duration-200";
    };

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 mb-2 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                <Link
                    to="/contracts/dashboard"
                    className={`px-6 pt-4 text-lg font-semibold ${getLinkClass(`/contracts/dashboard`)}`}
                >
                    DASHBOARD
                </Link>
                <Link
                    to="/contracts/list"
                    className={`px-6 py-1 text-md ${getLinkClass(`/contract/list`)}`}
                >
                    Contract List
                </Link>
            </nav>

            {/* Filter Section */}
            <div className="px-4 py-3 mt-4 bg-green-700 rounded-lg">
                <div>
                    <h3 className="text-md font-semibold mb-2">Level</h3>
                    <div className="flex flex-col space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                value="1"
                                className="w-5 h-5 accent-green-500 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-300"
                                // onChange={(e) => handleCheckboxFilter(e)}
                            />
                            <span className="text-sm">Level 1</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                value="2"
                                className="w-5 h-5 accent-green-500 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-300"
                                // onChange={(e) => handleCheckboxFilter(e)}
                            />
                            <span className="text-sm">Level 2</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                value="3"
                                className="w-5 h-5 accent-green-500 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-300"
                                // onChange={(e) => handleCheckboxFilter(e)}
                            />
                            <span className="text-sm">Level 3</span>
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Department</h3>
                    <select
                        className="w-full px-3 py-2 text-sm rounded-lg border-none text-gray-600 focus:outline-none"
                        // onChange={(e) => handleDropdownFilter(e.target.value)} // Function untuk filter dropdown
                    >
                        <option value="">All Department</option>
                        <option value="1">Dept 1</option>
                        <option value="2">Dept 2</option>
                        <option value="3">Dept 3</option>
                    </select>
                </div>
                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Contract Type</h3>
                    <select
                        className="w-full px-3 py-2 text-sm rounded-lg border-none text-gray-600 focus:outline-none"
                        // onChange={(e) => handleDropdownFilter(e.target.value)} // Function untuk filter dropdown
                    >
                        <option value="">All Contract</option>
                        <option value="1">Contract 1</option>
                        <option value="2">Contract 2</option>
                        <option value="3">Contract 3</option>
                    </select>
                </div>
                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Date</h3>
                    <div className="flex flex-col space-y-3">
                        {/* Start Date */}
                        <div>
                            <label htmlFor="start-date" className="block text-sm mb-1 text-center">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                className="w-full px-3 py-2 text-gray-600 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                // onChange={(e) => handleDateFilter(e, "startDate")}
                            />
                        </div>
                        {/* End Date */}
                        <div>
                            <label htmlFor="end-date" className="block text-sm mb-1 text-center">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end-date"
                                className="w-full px-3 py-2 text-gray-600 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                // onChange={(e) => handleDateFilter(e, "endDate")}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        className="border"
                    >
                        Filter
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
