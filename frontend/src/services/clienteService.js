// src/services/clienteService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/'; // Ajusta a tu URL del backend

export const obtenerClientes = () => {
    return axios.get(`${API_URL}clientes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const actualizarCliente = (cliente) => {
    return axios.put(`${API_URL}cliente/${cliente.id}`, cliente, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const eliminarCliente = (idCliente) => {
    return axios.delete(`${API_URL}cliente/${idCliente}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const crearCliente = (datosCliente) => {
    return axios.post('http://localhost:5000/cliente', datosCliente, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};