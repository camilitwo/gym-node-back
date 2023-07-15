const mongoose = require('mongoose');

// Definir el esquema de la rutina
const rutinaSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  ejercicios: [
    {
      nombre: {
        type: String,
        required: true
      },
      series: {
        type: Number,
        required: true
      },
      repeticiones: {
        type: String,
        required: true
      },
      explicacion: {
        type: String,
        required: true
      }
    }
  ]
});

// Crear el modelo 'Rutina' a partir del esquema
const Rutina = mongoose.model('Rutina', rutinaSchema);

module.exports = Rutina;
