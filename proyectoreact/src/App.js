import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([
    { id: 'ABC-123', capacity: 1000, fuelConsumption: 5, currentLoad: 200, driver: 'Juan Perez' },
    { id: 'XYZ-789', capacity: 1500, fuelConsumption: 7, currentLoad: 500, driver: 'Luis Ramirez' },
    { id: 'LMZ-239', capacity: 2000, fuelConsumption: 9, currentLoad: 500, driver: 'Carlos Gomez' },
    { id: 'OWZ-777', capacity: 800, fuelConsumption: 4, currentLoad: 500, driver: 'Jose Fernandez' },
  ]);
  const [loadInput, setLoadInput] = useState(0);

  const isAuthenticated = !!localStorage.getItem('token');

  const handleContract = (truckId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const truck = trucks.find(truck => truck.id === truckId);
      alert(`Detalles del camión:\nID: ${truck.id}\nCapacidad: ${truck.capacity} kg\nConsumo: ${truck.fuelConsumption} galones/km\nConductor: ${truck.driver}`);
    }
  };

  const findBestTruck = (load) => {
    const availableTrucks = trucks.filter(truck => truck.capacity >= load);
    if (availableTrucks.length === 0) {
      return 'No hay camiones disponibles';
    }
    const bestTruck = availableTrucks.reduce((prev, curr) => {
      return (prev.fuelConsumption < curr.fuelConsumption) ? prev : curr;
    });
    return `El mejor camión para la carga de ${load} kg es ${bestTruck.id} (Consumo: ${bestTruck.fuelConsumption} galones/km)`;
  };

  return (
    <div className="App">
      <h1>Empresa de Transporte</h1>
      <div className="controls">
        <input
          type="number"
          value={loadInput}
          onChange={e => setLoadInput(e.target.value)}
          placeholder="Carga (kg)"
        />
        <button onClick={() => alert(findBestTruck(parseInt(loadInput)))}>Buscar Mejor Camión</button>
      </div>
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

export default App;
