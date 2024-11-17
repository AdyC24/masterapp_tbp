import React from "react";
import { useParams } from "react-router-dom";
import useFetchContract from "./useFetchContract";
import { formatDate } from "./dateUtils";

const ComDev = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Community Development</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const EBI = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Environment & Business Improvement</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left">{contract.levelCode}</td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Exploration = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Exploration</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const ExRel = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">External Relation</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Forestry = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Forestry & Permitting Compliance</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const GC = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Grade Control</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const HRGA = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">HR & GA</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Logistic = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Logistic</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const MPE = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">MPE</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const MSC = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Mine Services</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const OHST = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">OHST & Training</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Plant = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Plant</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const PrepLab = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Preparation & Laboratory</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Production = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Production</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const QC = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Quality Control</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Security = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Security</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

const Shipping = () => {
    const { dept } = useParams();
    const contracts = useFetchContract(dept)

    return(
        <div>
            <h2 className="text-3xl font-semibold mb-8">Shipping</h2>
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
                        {contracts.map(contract => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{contract.empNik}</td>
                                    <td className="py-3 px-6 text-left">{contract.persName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.posName}</td>
                                    <td className="py-3 px-6 text-left"></td>
                                    <td className="py-3 px-6 text-left">{contract.contractType}</td>
                                    <td className="py-3 px-6 text-left">{formatDate(contract.contractEnd)}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                            {contract.contractPA}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
                                        {contract.contractSP}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className= "py-1 px-3 rounded-full text-xs bg-red-200 text-red-600">
                                            {contract.contractSign}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}


export { 
    ComDev, EBI, Exploration, ExRel,
    Forestry, GC, HRGA, Logistic,
    MPE,
    MSC, OHST, Plant, PrepLab,
    Production, QC, Security,
    Shipping
 };
