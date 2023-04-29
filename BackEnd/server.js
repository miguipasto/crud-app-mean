const express = require('express');
const mongoose = require('mongoose');
const activitiesRoute = require('./routes/activitiesRoute');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuración de Express
const app = express();
app.use(cors());

// Configuración de BodyParser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// Rutas
app.use(activitiesRoute);

//Imagenes
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Crea una ruta para la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'HOLA MUNDO' });
});

// Inicio del servidor
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Conexión a la base de datos
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/database_web', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.log('Database connection error:', error));



