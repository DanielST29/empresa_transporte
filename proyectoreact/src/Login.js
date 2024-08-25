import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Instancia useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicio de sesión exitoso');
      navigate('/');  // Navega a la página principal después de iniciar sesión
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  const handleRegister = () => {
    navigate('/register');  // Navega a la página de registro
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar Sesión</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="login-input"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="login-input"
        />
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <p className="register-link">
        ¿No tienes una cuenta? <span onClick={handleRegister}>Regístrate</span>  {/* Cambié el evento de click */}
      </p>
    </div>
  );
}

export default Login;
