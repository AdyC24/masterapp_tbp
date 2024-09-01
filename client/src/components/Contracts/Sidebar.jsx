// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const dummyDept = [   
        'Community Development',
        'Environment & Business Improvement',
        'Exploration',
        'External Relation',
        'Forestry Permitting And Compliance',
        'Grade Control',
        'HR & GA',
        'Logistic',
        'Mine Services',
        'MPE - Engineering',
        'MPE - Survey',
        'MPE - Site Fluk',
        'OHS & Training',
        'Plant',
        'Preparation & Laboratorium',
        'Production',
        'Quality Control',
        'Security',
        'Shipping - TBP & GTS',
        'Shipping - GSP'
    ]

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 mb-2 rounded-lg">
            <nav className="flex flex-col justify-center flex-grow py-4 space-y-4">
                {dummyDept.map((dept, index) => (
                    <Link
                        key={index}
                        to={`/contract/${dept}`}
                        className={`px-6 py-2 text-md hover:bg-green-500 hover:text-white transition duration-200`}
                    >
                        {dept}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
