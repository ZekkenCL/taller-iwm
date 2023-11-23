import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import login_imagen from '../assets/images/logo.png';

// Componente para el formulario de inicio de sesión
function LoginForm() {
    // Estados para guardar el nombre de usuario, contraseña y posibles errores
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Uso del contexto de autenticación y del hook navigate para la redirección
    const { login } = useAuth();
    const navigate = useNavigate();

    // Manejo del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Intenta autenticar al usuario
            const token = await authenticateUser(username, password);
            if (token) {
                // Si la autenticación es exitosa, navega al dashboard
                login(token);
                navigate('/dashboard');
            } else {
                // Si las credenciales son incorrectas, muestra un error
                setError('Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            // Manejo de errores de conexión o del servidor
            setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
        }
    };

    // Renderización del formulario
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 fondo-personalizado">
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">

                <form onSubmit={handleSubmit} className="form-signin">
                    <img className="mb-4" src= {login_imagen} alt="" width="100" height="100" />
                    <h5 className="card-title mb-3">Iniciar sesion</h5>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button className="btn btn-primary w-100" type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default LoginForm;

// Función para autenticar al usuario con el backend
async function authenticateUser(username, password) {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        // Lanza un error si la respuesta del servidor no es exitosa
        throw new Error('Falló la autenticación');
    }

    const data = await response.json();
    return data.access_token; // Devuelve el token de acceso
}

       