import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "./dateUtils";

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [signature, setSignature] = useState({});
    const [showModal, setShowModal] = useState(false);

    const { nik } = useParams();

    const fetchContract = useCallback(
        async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contract/${nik}`);
                setContracts(response.data.data);
            } catch (error) {
                console.error("Error fetching contract:", error);
            }
        }, [nik]);

    useEffect(() => {
        fetchContract();
    }, [fetchContract]);

    const fetchSignature = useCallback(async () => {
        try {
            const signature = await axios.get(`http://localhost:4000/employee/${nik}/signature`);
            if (JSON.stringify(signature.data.data) !== JSON.stringify(signature)) {
                setSignature(signature.data.data);
            }
        } catch (error) {
            console.error("Error fetching signature", error);
        }
    }, [nik]);

    useEffect(() => {
        fetchSignature();
    }, [fetchSignature]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('signature', file);

        try {
            const response = await axios.post(`http://localhost:4000/employee/${nik}/signature`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSignature(response.data.data);
            console.log('Signature uploaded successfully');
        } catch (error) {
            console.error('Error uploading signature:', error);
        }
    };

    const handleGenerateContract = () => {
        setShowModal(true);
    };

    const handleConfirmGenerateContract = async () => {
        setShowModal(false);
        // Add your contract generation logic here
        try {
            const response = await axios.post(`http://localhost:4000/contract/${nik}`);
            console.log('Contract generated successfully:', response.data);
            fetchContract(); // Refresh the contract list
        } catch (error) {
            console.error('Error generating contract:', error);
        }
    };

    const handleCancelGenerateContract = () => {
        setShowModal(false);
    };

    return (
        <div id="personalContract">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Contract Information</h2>
                <div className="flex items-center">
                    <span className={`mr-4 px-2 py-1 rounded ${signature.signature ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {signature.signature ? "Signature is available" : "Signature is not available"}
                    </span>
                    <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Upload New Signature
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
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
                         {contracts.map(contract => (
                            <tr key={contract.contractId} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{contract.contractType}</span>
                                </td>
                                <td className="py-3 px-6 text-left">{contract.contractNo}</td>
                                <td className="py-3 px-6 text-left">{formatDate(contract.contractStart)}</td>
                                <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                <td className="py-3 px-6 text-left">{contract.contractStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button onClick={handleGenerateContract} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                    Generate Contract
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">Confirm Contract Generation</h2>
                        <p>Are you sure you want to generate a new contract to PKWT 1?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleCancelGenerateContract} className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={handleConfirmGenerateContract} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contracts;