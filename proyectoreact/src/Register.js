import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importa los estilos del login (CSS compartido)

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica para el registro
    navigate('/login');  // Redirige a la página de login tras registrarse
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2>Registrarse</h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nombre"
          className="form-input"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          className="form-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-input"
        />
        <button type="submit" className="form-button">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
