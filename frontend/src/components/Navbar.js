import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar al usuario
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas estilizadas
import logo from '../assets/images/logo.png'; // Importa una imagen de logo

const Navbar = () => {
    const navigate = useNavigate(); // Inicializa navigate para la navegación programática

    // Función para confirmar el cierre de sesión
    const confirmarCerrarSesion = () => {
        Swal.fire({ // Usa SweetAlert2 para mostrar una alerta de confirmación
            title: '¿Estás seguro?',
            text: "¿Quieres cerrar la sesión?",
            icon: 'warning',
            showCancelButton: true, // Muestra un botón para cancelar la acción
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                cerrarSesion(); // Llama a cerrarSesion si el usuario confirma
            }
        });
    };

    // Función para manejar el cierre de sesión
    const cerrarSesion = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    // Renderizado del componente Navbar
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
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
