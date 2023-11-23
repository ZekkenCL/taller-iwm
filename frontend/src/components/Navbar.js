import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const confirmarCerrarSesion = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Quieres cerrar la sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                cerrarSesion();
            }
        });
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={logo} alt="" width="50" height="50" />
                <button className="btn btn-outline-danger" onClick={confirmarCerrarSesion}>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
