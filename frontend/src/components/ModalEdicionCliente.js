import React, { useState } from 'react';

// Componente ModalEdicionCliente para editar datos de un cliente
function ModalEdicionCliente({ cliente, guardarCambios, cerrarModal }) {
    // Estados para cada campo del formulario y para manejar errores
    const [nombre, setNombre] = useState(cliente.name);
    const [apellido, setApellido] = useState(cliente.lastname);
    const [email, setEmail] = useState(cliente.email);
    const [puntos, setPuntos] = useState(cliente.points);
    const [error, setError] = useState('');

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del email
        if (!validarEmail(email)) {
            setError('El correo electrónico no es válido');
            return; // Detiene la función si el email no es válido
        }

        // Verificar que los campos nombre y apellido no estén vacíos
        if (!nombre || !apellido) {
            setError('Todos los campos son obligatorios');
            return; // Detiene la función si algún campo está vacío
        }

        // Limpia errores previos y guarda los cambios
        setError('');
        guardarCambios({ ...cliente, name: nombre, lastname: apellido, email, points: puntos });
        cerrarModal(); // Cierra el modal después de guardar cambios
    };

    // Función para validar el formato del email
    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return regex.test(email);
    };

    // Renderización del formulario en un modal
    return (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Cliente</h5>
                        <button type="button" className="btn-close" onClick={cerrarModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="puntos" className="form-label">Puntos</label>
                                <input type="number" className="form-control" id="puntos" value={puntos} onChange={(e) => setPuntos(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEdicionCliente;
