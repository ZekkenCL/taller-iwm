import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente PrivateRoute para proteger rutas
const PrivateRoute = ({ element, ...rest }) => {
    // Obtener el estado de autenticación del contexto
    const { authState } = useAuth();

    // Renderiza el elemento (ruta protegida) si el usuario está autenticado
    // De lo contrario, redirige al usuario a la página de inicio de sesión
    return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
