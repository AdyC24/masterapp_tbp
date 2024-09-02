import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import EmployeePage from './components/Employee/EmployeePage'
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import Personal from './components/EmployeeDetails/Details/Personal';
import Contracts from './components/EmployeeDetails/Details/Contracts';
import OrganizationPage from './components/StructureOrganization/OrganizationPage';
import ContractPage from './components/Contracts/ContractPage';
import { ComDev, EBI, Exploration, ExRel, Forestry, GC, HRGA, Logistic, MPEEng, MPEFluk, MPESurvey, MSC, OHST, Plant, PrepLab, Production, QC, Security, ShippingGSP, ShippingTBPGTS } from './components/Contracts/Details/ContractDetail';
import ContractDashboard from './components/Contracts/Details/ContractDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/so" element={<OrganizationPage />}/>
          <Route path="/employee/:nik" element={<EmployeeDetails />}>
            <Route path="personal" element={<Personal />} /> 
            <Route path="contract" element={<Contracts />} /> 
          </Route>
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/contracts" element={<ContractPage />}>
            <Route path="dashboard" element={<ContractDashboard />} />
            <Route path="ComDev" element={<ComDev />} /> 
            <Route path="EBI" element={<EBI />} /> 
            <Route path="Exploration" element={<Exploration />} /> 
            <Route path="ExRel" element={<ExRel />} />  
            <Route path="Forestry" element={<Forestry />} />  
            <Route path="GC" element={<GC />} />
            <Route path="HRGA" element={<HRGA />} />
            <Route path="Logistic" element={<Logistic />} />
            <Route path="MSC" element={<MSC />} />
            <Route path="MPEEng" element={<MPEEng />} /> 
            <Route path="MPESurvey" element={<MPESurvey />} /> 
            <Route path="MPEFluk" element={<MPEFluk />} /> 
            <Route path="OHST" element={<OHST />} /> 
            <Route path="Plant" element={<Plant />} /> 
            <Route path="PrepLab" element={<PrepLab />} /> 
            <Route path="Prod" element={<Production />} /> 
            <Route path="QC" element={<QC />} /> 
            <Route path="Security" element={<Security />} /> 
            <Route path="ShippingTBPGTS" element={<ShippingTBPGTS />} /> 
            <Route path="ShippingGSP" element={<ShippingGSP />} />
          </Route> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<AuthenticatedRoute />} />
        </Routes>
      </Router>  
    </AuthProvider>
  );
}

function AuthenticatedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
          const response = await fetch('auth/check-session', {
            credentials: 'include' //kirim coockie jika diperlukan
          });
          console.log('response session:', response);
    
          if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`)
          }
    
          const data = await response.json();
      
          if (!data.isAuthenticated) {
            navigate('/login');
          } else {
            navigate('/home')
          }
      } catch (error) {
        console.error('Failed to check session:', error);
        navigate('/login')
      }
    };

    checkSession();   
  }, [navigate]);

  return <p>Loading ...</p>
}

export default App;
