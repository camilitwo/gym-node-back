const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Rutina = require('./rutina.js')
const cors = require('cors');



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
app.use(cors());
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

app.put('/rutinas/ejercicios/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const newWeight = req.body.peso;
  const updateDate = new Date();

  try {
    const rutina = await Rutina.findOneAndUpdate(
      { 'ejercicios._id': exerciseId },
      {
        $set: {
          'ejercicios.$.peso': newWeight,
          'ejercicios.$.fechaActualizacion': updateDate
        }
      },
      { new: true }
    );

    if (rutina) {
      console.log('Peso del ejercicio actualizado exitosamente');
      res.sendStatus(200);
    } else {
      console.log('Ejercicio no encontrado');
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error al actualizar el ejercicio:', error);
    res.sendStatus(500);
  }
});

    


// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
