import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { authState } = useAuth();

    return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
