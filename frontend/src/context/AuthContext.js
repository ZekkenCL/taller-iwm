import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: false
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthState({
            token: token,
            isAuthenticated: true
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            isAuthenticated: false
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
