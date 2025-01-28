import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import MPPTable from "./MPPTable";

const MPPPage = () => {
    return(
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar/>
                <div className="flex-grow mx-auto py-8">
                    <MPPTable/>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MPPPage