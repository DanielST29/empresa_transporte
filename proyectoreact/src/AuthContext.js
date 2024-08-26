import React, { useContext, useState, useEffect } from 'react';

// Crea un contexto de autenticación
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Verifica si hay un token almacenado y lo usa para obtener el usuario actual
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si existe un token, obtener los datos del usuario desde el backend
    if (token) {
      fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Enviar el token en los headers
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setCurrentUser(data.user); // Establecer el usuario actual si está autenticado
          }
        })
        .catch(err => {
          console.error('Error al obtener el usuario:', err);
          setCurrentUser(null); // Eliminar usuario si el token no es válido
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
