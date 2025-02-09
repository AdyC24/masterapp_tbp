//App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import EmployeePage from './components/Employee/EmployeePage'
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import Personal from './components/EmployeeDetails/Details/Personal';
import Contracts from './components/EmployeeDetails/Details/Contracts';
import OrganizationPage from './components/StructureOrganization/OrganizationPage';
import ContractPage from './components/Contracts/ContractPage';
import ContractDashboard from './components/Contracts/Details/ContractDashboard';
import ImportsPage from './components/Imports/ImportsPage';
import MPPPage from './components/MPP/MPPPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/so" element={<OrganizationPage />}/>
          <Route path='/mpp' element={<MPPPage/>}/>
          <Route path="/employee/:nik" element={<EmployeeDetails />}>
            <Route path="personal" element={<Personal />} /> 
            <Route path="contract" element={<Contracts />} /> 
          </Route>
          <Route path="/imports" element={<ImportsPage />}/>
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/contracts" element={<ContractPage />}>
            <Route path="dashboard" element={<ContractDashboard />} />
            <Route path="list" element={<ContractPage />} /> 
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
            credentials: 'include' //kirim cookie jika diperlukan
          });
          console.log('response session:', response);
    
          if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
          }
    
          const data = await response.json();
      
          if (!data.isAuthenticated) {
            navigate('/login');
          } else {
            navigate('/home');
          }
      } catch (error) {
        console.error('Failed to check session:', error);
        navigate('/login');
      }
    };

    checkSession();   
  }, [navigate]);

  return <p>Loading ...</p>;
}

export default App;
