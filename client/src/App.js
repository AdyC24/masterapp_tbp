import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<AuthenticatedRoute />}/>
      </Routes>
    </Router>  
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
