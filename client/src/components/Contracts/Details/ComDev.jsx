import React from "react";

const ComDev = () => {

    return(
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Non Local</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">No</th>
                                <th className="py-3 px-6 text-left">NIK</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Level</th>
                                <th className="py-3 px-6 text-left">Position</th>
                                <th className="py-3 px-6 text-left">Length of Service</th>
                                <th className="py-3 px-6 text-left">Contract</th>
                                <th className="py-3 px-6 text-left">Expired Date</th>
                                <th className="py-3 px-6 text-left">PA</th>
                                <th className="py-3 px-6 text-left">SP</th>
                                <th className="py-3 px-6 text-left">Direct</th>
                                <th className="py-3 px-6 text-left">Sign</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">1</td>
                                <td className="py-3 px-6 text-left">02D2300092</td>
                                <td className="py-3 px-6 text-left">Budi Susanto</td>
                                <td className="py-3 px-6 text-left">II</td>
                                <td className="py-3 px-6 text-left">Health Staff</td>
                                <td className="py-3 px-6 text-left">PKWT 1 - Add 1</td>
                                <td className="py-3 px-6 text-left">8 months</td>
                                <td className="py-3 px-6 text-left">14 September 2024</td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        Done
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        Done
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                        Not Yet
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                        Not Yet
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Local</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">No</th>
                                <th className="py-3 px-6 text-left">NIK</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Level</th>
                                <th className="py-3 px-6 text-left">Position</th>
                                <th className="py-3 px-6 text-left">Length of Service</th>
                                <th className="py-3 px-6 text-left">Contract</th>
                                <th className="py-3 px-6 text-left">Expired Date</th>
                                <th className="py-3 px-6 text-left">PA</th>
                                <th className="py-3 px-6 text-left">SP</th>
                                <th className="py-3 px-6 text-left">Direct</th>
                                <th className="py-3 px-6 text-left">Sign</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">1</td>
                                <td className="py-3 px-6 text-left">M0406240399</td>
                                <td className="py-3 px-6 text-left">Shahbudin Abdullah</td>
                                <td className="py-3 px-6 text-left">II</td>
                                <td className="py-3 px-6 text-left">Health Staff</td>
                                <td className="py-3 px-6 text-left">PKWT 1 - Add 1</td>
                                <td className="py-3 px-6 text-left">5 months</td>
                                <td className="py-3 px-6 text-left">14 September 2024</td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        Done
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        Done
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        Done
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                        Not Yet
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

export default ComDev