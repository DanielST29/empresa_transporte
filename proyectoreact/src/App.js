import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([
    { id: 'ABC-123', capacity: 1000, fuelConsumption: 5, currentLoad: 200, driver: 'Juan Perez' },
    { id: 'XYZ-789', capacity: 1500, fuelConsumption: 7, currentLoad: 500, driver: 'Luis Ramirez' },
    { id: 'LMZ-239', capacity: 2000, fuelConsumption: 9, currentLoad: 500, driver: 'Carlos Gomez' },
    { id: 'OWZ-777', capacity: 800, fuelConsumption: 4, currentLoad: 500, driver: 'Jose Fernandez' },
  ]);

  const handleContract = (truckId) => {
    if (!currentUser) {
      navigate('/login'); // Redirige al login si no está autenticado
    } else {
      const truck = trucks.find(truck => truck.id === truckId);
      alert(`Detalles del camión:\nID: ${truck.id}\nCapacidad: ${truck.capacity} kg\nConsumo: ${truck.fuelConsumption} galones/km\nConductor: ${truck.driver}`);
    }
  };

  return (
    <div className="App">
      <h1>Empresa de Transporte</h1>
      <div className="truck-list">
        {trucks.map(truck => (
          <div className="truck" key={truck.id}>
            <h2>{truck.id}</h2>
            <p>Capacidad de carga: {truck.capacity} kg</p>
            <p>Consumo de gasolina: {truck.fuelConsumption} galones/km</p>
            <p>Carga actual: {truck.currentLoad} kg</p>
            <button onClick={() => handleContract(truck.id)}>Contratar Servicio</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicio de sesión exitoso');
      navigate('/');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Iniciar Sesión</button>
      <button type="button" onClick={goToRegister}>Registrarse</button>
    </form>
  );
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí puedes agregar lógica para guardar firstName y lastName en la base de datos
      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default App;
export { Login, Register };
