// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const dummyDept = [
        {
            picName: 'Community Development',
            picNick: 'ComDev'
        },
        {
            picName: 'Environment & Business Improvement',
            picNick: 'EBI'
        },
        {
            picName: 'Exploration',
            picNick: 'Exploration'
        },
        {
            picName: 'External Relation',
            picNick: 'ExRel'
        },
        {
            picName: 'Forestry Permitting And Compliance',
            picNick: 'Forestry'
        },
        {
            picName: 'Grade Control',
            picNick: 'GC'
        },
        {
            picName: 'HR & GA',
            picNick: 'HRGA'
        },      
        {
            picName: 'Logistic',
            picNick: 'Logistic'
        },      
        {
            picName: 'Mine Services',
            picNick: 'MSC'
        },      
        {
            picName: 'MPE - Engineering',
            picNick: 'MPEEng'
        },      
        {
            picName: 'MPE - Survey',
            picNick: 'MPESurvey'
        },      
        {
            picName: 'MPE - Site Fluk',
            picNick: 'MPEFluk'
        },      
        {
            picName: 'OHS & Training',
            picNick: 'OHST'
        },      
        {
            picName: 'Plant',
            picNick: 'Plant'
        },      
        {
            picName: 'Preparation & Laboratorium',
            picNick: 'PrepLab'
        },      
        {
            picName: 'Production',
            picNick: 'Prod'
        },      
        {
            picName: 'Quality Control',
            picNick: 'QC'
        },      
        {
            picName: 'Security',
            picNick: 'Security'
        },      
        {
            picName: 'Shipping - TBP & GTS',
            picNick: 'ShippingTBPGTS'
        },      
        {
            picName: 'Shipping - GSP',
            picNick: 'ShippingGSP'
        }
        
    ]

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 mb-2 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                {dummyDept.map((dept, index) => (
                    <Link
                        key={dept.picName}
                        to={`/contracts/${dept.picNick}`}
                        className={`px-6 py-2 text-md hover:bg-green-500 hover:text-white transition duration-200`}
                    >
                        {dept.picName}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
