// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const dummyDept = [   
        'Business Control',
        'Business Development',
        'Community Development',
        'Community Relation',
        'Corporate Communication',
        'CSR',
        'Environment & Business Improvement',
        'Exploration',
        'Exploration & Mine Development',
        'External Relation',
        'Finance & Accounting',
        'Forestry Permitting And Compliance',
        'Grade Control',
        'HR & GA',
        'IT',
        'Land Acquisitions',
        'Land Management',
        'Logistic',
        'Management',
        'Mine Geology',
        'Mine Services',
        'MPE',
        'OHS & Training',
        'Outer Project',
        'Plant',
        'Preparation & Laboratorium',
        'Production',
        'Purchasing',
        'Quality Control',
        'Security',
        'Shipping',
        'Sustainable Product Development'
    ]

    return (
        <div className="w-64 bg-green-600 shadow-lg flex flex-col h-full text-white mt-6 rounded-lg">
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
