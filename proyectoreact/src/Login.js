import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token JWT en localStorage
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        navigate('/home');  // Redirige a la vista de camiones
      } else {
        alert(data.message);  // Muestra el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      alert('Error en la autenticación');
    }
  };

  const goToRegister = () => {
    navigate('/register');  // Redirige a la página de registro
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar Sesión</h2>
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
        <button type="submit" className="form-button">Iniciar Sesión</button>
        <button type="button" onClick={goToRegister} className="form-button secondary">Registrarse</button>
      </form>
    </div>
  );
}

export default Login;
