import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ContractPage = () => {

    // Render the correct component based on the dept parameter
    // const renderComponent = () => {
    //     switch (dept) {
    //         case 'ComDev':
    //             return <ComDev />;
    //         case 'EBI':
    //             return <EBI />;
    //         case 'Exploration':
    //             return <Exploration />;
    //         case 'ExRel':
    //             return <ExRel />;
    //         case 'Forestry':
    //             return <Forestry />;
    //         case 'GC':
    //             return <GC />;
    //         case 'HRGA':
    //             return <HRGA />;
    //         case 'Logistic':
    //             return <Logistic />;
    //         case 'MSC':
    //             return <MSC />;
    //         case 'MPE':
    //             return <MPE />;
    //         case 'OHST':
    //             return <OHST />;
    //         case 'Plant':
    //             return <Plant />;
    //         case 'PrepLab':
    //             return <PrepLab />;
    //         case 'Prod':
    //             return <Production />;
    //         case 'QC':
    //             return <QC />;
    //         case 'Security':
    //             return <Security />;
    //         case 'Shipping':
    //             return <Shipping />;
    //         default:
    //             return <div>Department not found</div>;
    //     }
    // };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div id="contractTable" className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6 mb-2">
                    <div>
                        <h2 className="text-3xl font-semibold mb-8">Contracts</h2>
                        <div className="mb-8">
                            <div className="overflow-x-auto shadow-lg rounded-lg">
                                <table className="min-w-full bg-white border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">NIK</th>
                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-left">Level</th>
                                            <th className="py-3 px-6 text-left">Position</th>
                                            <th className="py-3 px-6 text-left">Hire Date</th>
                                            <th className="py-3 px-6 text-left">Contract</th>
                                            <th className="py-3 px-6 text-left">Expired Date</th>
                                            <th className="py-3 px-6 text-left">PA</th>
                                            <th className="py-3 px-6 text-left">SP</th>
                                            <th className="py-3 px-6 text-left">Sign</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                    {/* {contracts.map(contract => ( */}
                                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left">nik</td>
                                                <td className="py-3 px-6 text-left">nama</td>
                                                <td className="py-3 px-6 text-left">level</td>
                                                <td className="py-3 px-6 text-left">posisi</td>
                                                <td className="py-3 px-6 text-left">hire date</td>
                                                <td className="py-3 px-6 text-left">jenis kontrak</td>
                                                <td className="py-3 px-6 text-left">tanggal expired</td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                                        {/* {contract.contractPA} */}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                                    {/* {contract.contractSP} */}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                                        {/* {contract.contractSign} */}
                                                    </span>
                                                </td>
                                            </tr>
                                        {/* ))} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContractPage;
