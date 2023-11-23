import React, { useState } from "react";

function ModalCrearUsuario({ crearUsuario, cerrarModal }) {
  const [name, setNombre] = useState("");
  const [lastname, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPuntos] = useState(0);
  const [errores, setErrores] = useState({});

  const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
  };

  const esTextoValido = (texto) => {
    return isNaN(texto) && texto.trim() !== '';
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    let erroresTemp = {};
    if (!validarEmail(email)) erroresTemp.email = "El correo electrónico no es válido";
    if (!esTextoValido(name)) erroresTemp.name = "El nombre no es válido";
    if (!esTextoValido(lastname)) erroresTemp.lastname = "El apellido no es válido";
    if (points < 0) erroresTemp.points = "Los puntos no pueden ser negativos";

    setErrores(erroresTemp);
    if (Object.keys(erroresTemp).length > 0) return;

    crearUsuario({ name, lastname, dni, email, points });
    cerrarModal();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Nuevo Usuario</h5>
            <button
              type="button"
              className="btn-close"
              onClick={cerrarModal}
            ></button>
          </div>
          <div className="modal-body">
            {Object.keys(errores).map(key => (
              <div key={key} className="alert alert-danger">{errores[key]}</div>
            ))}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI/RUT</label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="puntos" className="form-label">Puntos</label>
                <input
                  type="number"
                  className="form-control"
                  id="points"
                  value={points}
                  onChange={(e) => setPuntos(Number(e.target.value))}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCrearUsuario;
