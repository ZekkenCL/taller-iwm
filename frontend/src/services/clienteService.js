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
