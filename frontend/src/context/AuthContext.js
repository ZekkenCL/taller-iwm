import React, { createContext, useContext, useState } from 'react';

// Crear un nuevo contexto de autenticación
const AuthContext = createContext(null);

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el token de autenticación y si el usuario está autenticado
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'), // Obtener token desde el almacenamiento local
        isAuthenticated: false
    });

    // Función para manejar el inicio de sesión
    const login = (token) => {
        localStorage.setItem('token', token); // Almacenar el token en localStorage
        setAuthState({ // Actualizar el estado de autenticación
            token: token,
            isAuthenticated: true
        });
    };

    // Función para manejar el cierre de sesión
    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        setAuthState({ // Actualizar el estado de autenticación
            token: null,
            isAuthenticated: false
        });
    };

    // Proveer el estado de autenticación y las funciones de login/logout a los componentes hijos
    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
