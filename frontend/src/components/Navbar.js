
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={logo} alt="" width="50" height="50" />
                <button className="btn btn-outline-danger" onClick={cerrarSesion}>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
