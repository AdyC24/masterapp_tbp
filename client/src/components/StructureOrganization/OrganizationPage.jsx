import React, { useState } from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import Navbar from "../Navbar";
import Footer from "../Footer";

const OrganizationPage = () => {
    const organizationData = {
        name: "HR & GA Manager",
        children: [
          {
            name: "HR Superintendent",
            children: [
              { name: "HR Operation Supervisor" },
              { name: "HR Planning Supervisor" },
              { name: "Compensation & Benefit Supervisor" },
              { name: "HRIS Supervisor" },
              { name: "IR Supervisor" }
            ]
          },
          {
            name: "GA Superintendent",
            children: [
              { name: "GA Supervisor" },
            ]
          },
        ]
    };

    const [expandedNodes, setExpandedNodes] = useState({ "HR & GA Manager": true });

    const toggleNode = (nodeName) => {
        setExpandedNodes((prev) => ({
            ...prev,
            [nodeName]: !prev[nodeName],
        }));
    };

    const renderNode = (node) => {
        const isExpanded = expandedNodes[node.name];
        return (
            <TreeNode
                label={
                    <div 
                        style={{ padding: '10px', border: '1px solid black', display: 'inline-block', cursor: 'pointer',borderRadius: '10px'}}
                        onClick={() => toggleNode(node.name)}
                    >
                        {node.name} {node.children && (isExpanded ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                            </svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                            </svg>
                          )}
                    </div>
                }
                key={node.name}
            >
                {isExpanded && node.children && node.children.map((child) => renderNode(child))}
            </TreeNode>
        );
    };

    const isParentExpanded = expandedNodes[organizationData.name];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 bg-gray-100 text-gray-800 font-sans">
                <h2 className="text-2xl mb-4 text-center text-gray-900">
                    Organization Structure
                </h2>
                <Tree
                    label={
                        <div 
                            style={{ padding: '10px', border: '1px solid black', display: 'inline-block', cursor: 'pointer', borderRadius: '10px'}}
                            onClick={() => toggleNode(organizationData.name)}
                        >
                            {organizationData.name} {organizationData.children && (isParentExpanded ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                                </svg>
                                : 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                </svg>
                                )}
                        </div>
                    }
                >
                    {isParentExpanded && organizationData.children.map((child) => renderNode(child))}
                </Tree>
            </div>
            <Footer />
        </div>
    );
};

export default OrganizationPage;
