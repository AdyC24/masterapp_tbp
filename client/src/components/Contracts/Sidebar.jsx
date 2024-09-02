// Sidebar.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
    const location = useLocation();

    useEffect(() => {
        fetchPic()
    }, [])

    const fetchPic = () => {

    }

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

    const getLinkClass = (path) => {
        return location.pathname.includes(path)
            ? "bg-green-500 text-white"
            : "hover:bg-green-500 hover:text-white transition duration-200"
    }

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 mb-2 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                <Link
                    to={'/contracts/dashboard'}
                    className={`px-6 pt-4 pb-2 text-xl font-semibold ${getLinkClass(`/contracts/dashboard`)}`}
                >
                    DASHBOARD
                </Link>
                {dummyDept.map((dept, index) => (
                    <Link
                        key={dept.picName}
                        to={`/contracts/${dept.picNick}`}
                        className={`px-6 py-1 text-md ${getLinkClass(`/contracts/${dept.picNick}`)}`}
                    >
                        {dept.picName}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
