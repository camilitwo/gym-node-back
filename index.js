const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Rutina = require('./rutina.js')

// Conectarse a MongoDB
mongoose.connect('mongodb+srv://appgym:appgym@cluster-gym.ruujfxg.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Crear la aplicación Express
const app = express();

app.use(bodyParser.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Conexión exitosa a MongoDB!');
});

app.get('/rutinas', async (req, res) => {
  try {
    const rutinas = await Rutina.find();
    res.json(rutinas);
  } catch (error) {
    console.error('Error al obtener las rutinas:', error);
    res.status(500).json({ error: 'Error al obtener las rutinas' });
  }
});

app.post('/rutinas', async (req, res) => {
  try {
    const rutinaData = req.body;
    const rutina = new Rutina(rutinaData);
    await rutina.save();
    res.status(201).json(rutina);
  } catch (error) {
    console.error('Error al insertar la rutina:', error);
    res.status(500).json({ error: 'Error al insertar la rutina' });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
