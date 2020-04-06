const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'//Referencia a proyecto
  }
});

module.exports = mongoose.model('Tarea', TareaSchema);