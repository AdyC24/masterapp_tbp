import React from "react";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import ProgramSection from "../ProgramSection";
import Footer from "../Footer";


const HomePage = () => {
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <HeroSection />
            <ProgramSection />
            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
};

export default HomePage