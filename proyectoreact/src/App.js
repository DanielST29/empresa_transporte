// Archivo: src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [trucks, setTrucks] = useState([
    { id: 'ABC-123', capacity: 1000, fuelConsumption: 5, currentLoad: 200 },
    { id: 'XYZ-789', capacity: 1500, fuelConsumption: 7, currentLoad: 500 },
    { id: 'LMZ-239', capacity: 2000, fuelConsumption: 9, currentLoad: 500 },
    { id: 'OWZ-777', capacity: 800, fuelConsumption: 4, currentLoad: 500 },
  ]);

  const [loadInput, setLoadInput] = useState(0);

  const loadTruck = (id, load) => {
    setTrucks(prevTrucks =>
      prevTrucks.map(truck => {
        if (truck.id === id && truck.currentLoad + load <= truck.capacity) {
          return { ...truck, currentLoad: truck.currentLoad + load };
        }
        return truck;
      })
    );
  };

  const unloadTruck = (id, load) => {
    setTrucks(prevTrucks =>
      prevTrucks.map(truck => {
        if (truck.id === id && truck.currentLoad >= load) {
          return { ...truck, currentLoad: truck.currentLoad - load };
        }
        return truck;
      })
    );
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
      <div className="truck-list">
        {trucks.map(truck => (
          <div className="truck" key={truck.id}>
            <h2>{truck.id}</h2>
            <p>Capacidad de carga: {truck.capacity} kg</p>
            <p>Consumo de gasolina: {truck.fuelConsumption} galones/km</p>
            <p>Carga actual: {truck.currentLoad} kg</p>
            <button onClick={() => loadTruck(truck.id, parseInt(loadInput))} disabled={truck.currentLoad >= truck.capacity}>Cargar</button>
            <button onClick={() => unloadTruck(truck.id, parseInt(loadInput))} disabled={truck.currentLoad === 0}>Descargar</button>
          </div>
        ))}
      </div>

      <div className="controls">
        <input
          type="number"
          value={loadInput}
          onChange={e => setLoadInput(e.target.value)}
          placeholder="Carga (kg)"
        />
        <button onClick={() => alert(findBestTruck(parseInt(loadInput)))}>Buscar Mejor Camión</button>
      </div>
    </div>
  );
}

export default App;
