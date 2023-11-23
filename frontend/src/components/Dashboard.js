import React, { useEffect, useState } from "react";
// Importaciones de componentes y servicios
import { obtenerClientes, actualizarCliente, eliminarCliente, crearCliente } from "../services/clienteService";
import ModalEdicionCliente from "./ModalEdicionCliente";
import ModalCrearUsuario from "./ModalCrearUsuario";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

function Dashboard() {
    // Estados para manejar los datos de los clientes y la búsqueda
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [clienteAEditar, setClienteAEditar] = useState(null);
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

    // useEffect para cargar los clientes al montar el componente
    useEffect(() => {
        cargarClientes();
    }, []);

    // Función para obtener clientes del servidor y actualizar el estado
    const cargarClientes = async () => {
        try {
            const respuesta = await obtenerClientes();
            setClientes(respuesta.data);
            setResultadosBusqueda(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    };

    // Manejadores de eventos para la búsqueda y filtrado de clientes
    const handleSearchChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        filtrarClientes(busqueda);
    };

    const filtrarClientes = (termino) => {
        const resultadosFiltrados = clientes.filter(
            (cliente) => cliente.dni.includes(termino) || cliente.email.includes(termino)
        );
        setResultadosBusqueda(resultadosFiltrados);
    };

    // Funciones para manejar la edición, creación y eliminación de clientes
    const iniciarEdicion = (cliente) => {
        setClienteAEditar(cliente);
    };

    // Función para actualizar cliente y manejar mensajes de éxito o error
    const guardarCambios = async (clienteEditado) => {
      try {
          await actualizarCliente(clienteEditado);
          setClienteAEditar(null);
          cargarClientes();
          Swal.fire('¡Éxito!', 'Cliente editado con éxito', 'success');
      } catch (error) {
          console.error("Error al editar el cliente:", error);
          Swal.fire('Error', 'No se pudo editar el cliente', 'error');
      }
  };

  // Función para agregar un nuevo usuario verificando unicidad de DNI y correo  
  const agregarUsuario = async (nuevoUsuario) => {
      // Verificar si ya existe un cliente con el mismo RUT/DNI o correo electrónico
      const clienteExistenteDni = clientes.some(cliente => cliente.dni === nuevoUsuario.dni);
      const clienteExistenteEmail = clientes.some(cliente => cliente.email === nuevoUsuario.email);

      if (clienteExistenteDni) {
          Swal.fire({
              title: 'Cliente ya registrado',
              text: 'Ya existe un cliente con el mismo RUT/DNI',
              icon: 'warning',
              confirmButtonText: 'Entendido'
          });
      } else if (clienteExistenteEmail) {
          Swal.fire({
              title: 'Cliente ya registrado',
              text: 'Ya existe un cliente con el mismo correo electrónico',
              icon: 'warning',
              confirmButtonText: 'Entendido'
          });
      } else {
          // Si el cliente no existe, proceder con la adición del nuevo cliente
          try {
              await crearCliente(nuevoUsuario);
              cargarClientes();
              setMostrarModalCrear(false);
              Swal.fire('¡Éxito!', 'Cliente agregado con éxito', 'success');
          } catch (error) {
              console.error("Error al agregar el cliente:", error);
              Swal.fire('Error', 'No se pudo agregar el cliente', 'error');
          }
      }
  };

  // Función para confirmar y ejecutar la eliminación de un cliente  
  const confirmarEliminacion = async (idCliente) => {
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

            if (confirmacionFinal.isConfirmed) {
                try {
                    await eliminarCliente(idCliente);
                    cargarClientes();
                    Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
                } catch (error) {
                    console.error("Error al eliminar el cliente:", error);
                    Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
                }
            }
        }
    };

    // Renderizado del componente incluyendo Navbar, formulario de búsqueda,
    // botón para agregar usuarios, y tabla de clientes.
    
    return (
        <div>
            <Navbar />
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
        </div>
    );
}

export default Dashboard;
