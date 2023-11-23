import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://localhost:5000/';

// Función para obtener la lista de clientes
export const obtenerClientes = () => {
    // Realiza una solicitud GET a la ruta '/clientes'
    // Incluye el token de autenticación en las cabeceras
    return axios.get(`${API_URL}clientes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Función para actualizar un cliente específico
export const actualizarCliente = (cliente) => {
    // Realiza una solicitud PUT a la ruta '/cliente/:id'
    // Envía los datos del cliente a actualizar y el token de autenticación
    return axios.put(`${API_URL}cliente/${cliente.id}`, cliente, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Función para eliminar un cliente específico
export const eliminarCliente = (idCliente) => {
    // Realiza una solicitud DELETE a la ruta '/cliente/:id'
    // Incluye el token de autenticación en las cabeceras
    return axios.delete(`${API_URL}cliente/${idCliente}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Función para crear un nuevo cliente
export const crearCliente = (datosCliente) => {
    // Realiza una solicitud POST a la ruta '/cliente'
    // Envía los datos del nuevo cliente y el token de autenticación
    return axios.post(`${API_URL}cliente`, datosCliente, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};
