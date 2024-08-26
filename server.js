const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Tu usuario de MySQL
    password: 'password', // Tu contraseña de MySQL
    database: 'empresa_transporte'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

const app = express();
app.use(cors());  // Habilitar CORS
app.use(bodyParser.json());

// Ruta de autenticación
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Consulta SQL para buscar el usuario en la base de datos
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Usuario encontrado, generar un token JWT
            const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
});

