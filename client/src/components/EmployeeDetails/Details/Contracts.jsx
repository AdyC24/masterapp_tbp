import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "./dateUtils";

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [signature, setSignature] = useState({});

    const { nik } = useParams()

    const fetchContract = useCallback(
        async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contract/${nik}`);
                setContracts(response.data.data)
            } catch (error) {
                console.error("Error fetching contract:", error)
            }
        }, [nik]); 

    useEffect(() => {
        fetchContract();
    }, [fetchContract]);

    const fetchSignatue = useCallback(async () => {
        try {
            const signature = await axios.get(`http://localhost:4000/employee/${nik}/signature`);
            if (JSON.stringify(signature.data.data) !== JSON.stringify(signature)) {
                setSignature(signature.data.data);
                console.log(signature.data.data);
            }
        } catch (error) {
            console.error("Error fetching signature", error);
        }
    }, [nik]);

    useEffect(() => {
        fetchSignatue();
    }, [fetchSignatue]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validExtensions = ['jpg', 'jpeg', 'png'];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (validExtensions.includes(fileExtension)) {
                const formData = new FormData();
                formData.append('signature', file);
                axios.patch(`http://localhost:4000/employee/${nik}/signature`, formData)
                    .then(response => {
                        console.log('Signature uploaded:', response.data);
                        fetchSignatue(); // Refresh signature data after upload
                    })
                    .catch(error => {
                        console.error('Error uploading signature:', error);
                    });
            } else {
                console.error('Invalid file type. Please upload an image file.');
            }
        }
    };

    
    return(
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
                                <td className="py-3 px-6 text-left">
                                <span className={`py-1 px-3 rounded-full text-xs ${contract.contractStatus === "Open" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
                                        {contract.contractStatus} 
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    Generate New Contract
                </button>
            </div>
        </div>       
    )
}

export default Contracts