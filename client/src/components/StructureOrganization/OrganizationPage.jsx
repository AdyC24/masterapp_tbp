import React, { useState } from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Tooltip } from 'react-tooltip';

const OrganizationPage = () => {
    const organizationData = {
        name: "HR & GA Manager",
        mpActual: 1,
        mpPlan: 1,
        mpDev: 0,
        recruitProcess: 0,
        children: [
            {
                name: "HR Superintendent",
                mpActual: 1,
                mpPlan: 0,
                mpDev: -1,
                recruitProcess: 0,
                children: [
                    { 
                        name: "HR Operation Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    },
                    { name: "HR Planning Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    },
                    { name: "Compensation & Benefit Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    },
                    { name: "HRIS Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    },
                    { name: "IR Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    }
                ]
            },
            {
                name: "GA Superintendent",
                mpActual: 1,
                mpPlan: 1,
                mpDev: 0,
                recruitProcess: 0,
                children: [
                    { name: "GA Supervisor",
                        mpActual: 2,
                        mpPlan: 2,
                        mpDev: 0,
                        recruitProcess: 0,
                    },
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
                        data-tooltip-id={`tooltip-${node.name}`}
                        style={{ 
                            padding: '10px', 
                            border: '1px solid black', 
                            display: 'inline-block', 
                            cursor: 'pointer',
                            borderRadius: '10px'
                        }}
                        onClick={() => toggleNode(node.name)}
                    >  
                        <div>
                            {node.name}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            {node.children && (isExpanded ? 
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
                        <Tooltip id={`tooltip-${node.name}`} place="top" effect="solid">
                            <p>Actual: {node.mpActual}</p> 
                            <p>Plan: {node.mpPlan}</p> 
                            <p>Deviation: {node.mpDev}</p>
                            <p>Recruit Process: {node.recruitProcess}</p>
                        </Tooltip>
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
                            data-tooltip-id={`tooltip-${organizationData.name}`}
                            style={{ 
                                padding: '10px', 
                                border: '1px solid black', 
                                display: 'inline-block', 
                                cursor: 'pointer', 
                                borderRadius: '10px'
                            }}
                            onClick={() => toggleNode(organizationData.name)}
                        >  
                            <div>
                                {organizationData.name}
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                {organizationData.children && (isParentExpanded ? 
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
                            <Tooltip id={`tooltip-${organizationData.name}`} place="top" effect="solid">
                                <p>Actual: {organizationData.mpActual}</p> 
                                <p>Plan: {organizationData.mpPlan}</p> 
                                <p>Deviation: {organizationData.mpDev}</p>
                                <p>Recruit Process: {organizationData.recruitProcess}</p>
                            </Tooltip>
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
