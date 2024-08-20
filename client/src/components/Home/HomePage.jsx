import React from "react";
import { useAuth } from "../../AuthContext";

import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import ProgramSection from "../ProgramSection";
import Footer from "../Footer";


const HomePage = () => {
    const { isAuthenticated } = useAuth()

    
    return (
        <div className="flex flex-col min-h-screen">
            <p>Authenticated: {isAuthenticated.toString()}</p>
            <Navbar/>
            <HeroSection />
            <ProgramSection />
            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
};

export default HomePage