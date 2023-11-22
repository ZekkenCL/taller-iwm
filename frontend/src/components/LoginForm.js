import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = await authenticateUser(username, password);
            if (token) {
                login(token);
                navigate('/dashboard');
            } else {
                setError('Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="container">
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario:</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
    </div>
    );
}

export default LoginForm;

async function authenticateUser(username, password) {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Falló la autenticación');
    }

    const data = await response.json();
    return data.access_token; // Asegúrate de que el backend envía el token con esta clave
}

       