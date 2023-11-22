import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import login_imagen from '../assets/images/logo.png';

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
    <div className="container-md align-items-center justify-content-center">
        <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
            <img className="mb-4" src={login_imagen} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Iniciar Sesion</h1>

            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button className="btn btn-lg btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    </main>
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

       