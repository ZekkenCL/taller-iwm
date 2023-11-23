import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute element={<Dashboard />} />
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
