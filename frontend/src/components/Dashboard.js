import React, { useEffect, useState } from 'react';
import { obtenerClientes } from '../services/clienteService';

function Dashboard() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const respuesta = await obtenerClientes();
                setClientes(respuesta.data);
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
                // Manejar errores aquí, por ejemplo, mostrar un mensaje de error
            }
        };

        cargarClientes();
    }, []);

    return (
        <div className='container text-center'>
            <h2>Lista de Clientes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.name}</td>
                            <td>{cliente.lastname}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
