import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { ComDev, EBI, Exploration, ExRel, Forestry, GC, HRGA, Logistic, MPE, MSC, OHST, Plant, PrepLab, Production, QC, Security, Shipping} from './Details/ContractDetail';

const ContractPage = () => {
    const { dept } = useParams();

    // Render the correct component based on the dept parameter
    const renderComponent = () => {
        switch (dept) {
            case 'ComDev':
                return <ComDev />;
            case 'EBI':
                return <EBI />;
            case 'Exploration':
                return <Exploration />;
            case 'ExRel':
                return <ExRel />;
            case 'Forestry':
                return <Forestry />;
            case 'GC':
                return <GC />;
            case 'HRGA':
                return <HRGA />;
            case 'Logistic':
                return <Logistic />;
            case 'MSC':
                return <MSC />;
            case 'MPE':
                return <MPE />;
            case 'OHST':
                return <OHST />;
            case 'Plant':
                return <Plant />;
            case 'PrepLab':
                return <PrepLab />;
            case 'Prod':
                return <Production />;
            case 'QC':
                return <QC />;
            case 'Security':
                return <Security />;
            case 'Shipping':
                return <Shipping />;
            default:
                return <div>Department not found</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div id="contractTable" className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 mt-6 mb-2">
                    {renderComponent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContractPage;
