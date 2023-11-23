import React, { useState } from 'react';

function ModalEdicionCliente({ cliente, guardarCambios, cerrarModal }) {
    const [nombre, setNombre] = useState(cliente.name);
    const [apellido, setApellido] = useState(cliente.lastname);
    const [email, setEmail] = useState(cliente.email);
    const [puntos, setPuntos] = useState(cliente.points);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar email
        if (!validarEmail(email)) {
            setError('El correo electrónico no es válido');
            return; // No continuar con el envío
        }

        if (!nombre || !apellido) {
            setError('Todos los campos son obligatorios');
            return; // No continuar con el envío
        }

        // Si todo está bien, continuar con guardar los cambios
        setError(''); // Limpiar errores previos
        guardarCambios({ ...cliente, name: nombre, lastname: apellido, email, points: puntos });
        cerrarModal();
    };

    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return regex.test(email);
      };

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
