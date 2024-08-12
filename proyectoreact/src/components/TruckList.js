// src/components/TruckList.js
import React, { useState } from 'react';
import Truck from './Truck';

const TruckList = () => {
  const [trucks, setTrucks] = useState([
    { licensePlate: 'ABC-123', capacity: 1000, fuelConsumption: 5, currentLoad: 200 },
    { licensePlate: 'XYZ-789', capacity: 1500, fuelConsumption: 7, currentLoad: 500 },
    { licensePlate: 'LMZ-239', capacity: 2000, fuelConsumption: 9, currentLoad: 500 },
    { licensePlate: 'OWZ-777', capacity: 800, fuelConsumption: 4, currentLoad: 500 },
    // Agrega más camiones según sea necesario
  ]);

  const loadTruck = (licensePlate, load) => {
    setTrucks(trucks.map(truck => 
      truck.licensePlate === licensePlate && truck.currentLoad + load <= truck.capacity 
        ? { ...truck, currentLoad: truck.currentLoad + load }
        : truck
    ));
  };

  const unloadTruck = (licensePlate, load) => {
    setTrucks(trucks.map(truck => 
      truck.licensePlate === licensePlate && truck.currentLoad - load >= 0 
        ? { ...truck, currentLoad: truck.currentLoad - load }
        : truck
    ));
  };

  return (
    <div>
      {trucks.map(truck => (
        <Truck key={truck.licensePlate} truck={truck} />
      ))}
      {/* Agrega aquí los botones o inputs para cargar/descargar camiones */}
    </div>
  );
}

export default TruckList;
