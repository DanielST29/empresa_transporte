// src/components/Truck.js
import React from 'react';

const Truck = ({ truck }) => {
  return (
    <div>
      <h2>{truck.licensePlate}</h2>
      <p>Capacidad de carga: {truck.capacity} kg</p>
      <p>Consumo de gasolina: {truck.fuelConsumption} galones/km</p>
      <p>Carga actual: {truck.currentLoad} kg</p>
    </div>
  );
}

export default Truck;
