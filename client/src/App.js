import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import EmployeePage from './components/Employee/EmployeePage'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<AuthenticatedRoute />}/>
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
