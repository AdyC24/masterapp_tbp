import React from "react";

const Contracts = () => {
    const contractData = [
        {
            contractName: "PKWT 1",
            contractNo: "213/HRD/PKWT I/GPS/XI/2023",
            startDate: "24 November 2023",
            endDate: "23 May 2024",
            status: "Not Active"
        },
        {
            contractName: "PKWT 1 - Addendum 1",
            contractNo: "354/HRD/PKWT I - Add I/GPS/II/2024",
            startDate: "24 May 2024",
            endDate: "23 August 2024",
            status: "Not Active"
        },
        {
            contractName: "PKWT 1 - Addendum 2",
            contractNo: "684/HRD/PKWT I - Add II/GPS/VII/2024",
            startDate: "24 August 2024",
            endDate: "23 November 2024",
            status: "Active"
        }
    ];

    return(
        <div>
            <h2 className="text-2xl font-semibold mb-4">Contract Information</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Contract</th>
                            <th className="py-3 px-6 text-left">Contract No</th>
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                         {contractData.map((contract, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{contract.contractName}</span>
                                </td>
                                <td className="py-3 px-6 text-left">{contract.contractNo}</td>
                                <td className="py-3 px-6 text-left">{contract.startDate}</td>
                                <td className="py-3 px-6 text-left">{contract.endDate}</td>
                                <td className="py-3 px-6 text-left">
                                <span className={`py-1 px-3 rounded-full text-xs ${contract.status === "Active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
                                        {contract.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Add Contract
                </button>
            </div>
        </div>       
    )
}

export default Contracts