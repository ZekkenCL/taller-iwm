import React, { useEffect, useState } from "react";
import {
  obtenerClientes,
  actualizarCliente,
  eliminarCliente,
  crearCliente,
} from "../services/clienteService";
import ModalEdicionCliente from "./ModalEdicionCliente";
import ModalCrearUsuario from "./ModalCrearUsuario"; // Asegúrate de importar el componente
import Swal from "sweetalert2";

function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const respuesta = await obtenerClientes();
      setClientes(respuesta.data);
      setResultadosBusqueda(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filtrarClientes(busqueda);
  };

  const filtrarClientes = (termino) => {
    const resultadosFiltrados = clientes.filter(
      (cliente) =>
        cliente.dni.includes(termino) || cliente.email.includes(termino)
    );
    setResultadosBusqueda(resultadosFiltrados);
  };

  const iniciarEdicion = (cliente) => {
    setClienteAEditar(cliente);
  };

  const guardarCambios = async (clienteEditado) => {
    await actualizarCliente(clienteEditado);
    setClienteAEditar(null);
    cargarClientes();
  };

  const agregarUsuario = async (nuevoUsuario) => {
    try {
        await crearCliente(nuevoUsuario);
        cargarClientes();
        setMostrarModalCrear(false); // Cerrar el modal

        // Mostrar mensaje de éxito
        Swal.fire({
            title: '¡Éxito!',
            text: 'Cliente agregado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error("Error al agregar el cliente:", error);
        // Mostrar mensaje de error
        Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar el cliente',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
};

const confirmarEliminacion = async (idCliente) => {
    // Primera confirmación
    const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
    });

    // Si el usuario confirma la primera alerta, mostrar la segunda
    if (resultado.isConfirmed) {
        const confirmacionFinal = await Swal.fire({
            title: 'Confirmar eliminación',
            text: "¿Realmente deseas eliminar este cliente?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'No, mantener'
        });

        // Si el usuario confirma la segunda alerta, proceder con la eliminación
        if (confirmacionFinal.isConfirmed) {
            try {
                await eliminarCliente(idCliente);
                cargarClientes();
                Swal.fire(
                    'Eliminado!',
                    'El cliente ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                console.error("Error al eliminar el cliente:", error);
                Swal.fire(
                    'Error',
                    'No se pudo eliminar el cliente',
                    'error'
                );
            }
        }
    }
};

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Lista de Clientes</h2>

      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto">
          <form onSubmit={handleSearchSubmit} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={busqueda}
              onChange={handleSearchChange}
              placeholder="Buscar por DNI o Correo"
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>

      <div className="mb-4">
        <button onClick={() => setMostrarModalCrear(true)} className="btn btn-primary">
          Crear Usuario
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Puntos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultadosBusqueda.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.name}</td>
              <td>{cliente.lastname}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.email}</td>
              <td>{cliente.points}</td>
              <td>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => iniciarEdicion(cliente)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmarEliminacion(cliente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModalCrear && (
        <ModalCrearUsuario
          crearUsuario={agregarUsuario}
          cerrarModal={() => setMostrarModalCrear(false)}
        />
      )}

      {clienteAEditar && (
        <ModalEdicionCliente
          cliente={clienteAEditar}
          guardarCambios={guardarCambios}
          cerrarModal={() => setClienteAEditar(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
