const mongoose = require("mongoose");

const date = new Date().toLocaleString();

const RespuestaSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  idUser: {
    type: String,
  },
  image: {
    type: String,
  },
  bodyRespuesta: {
    type: String,
  },
  storyId: {
    type: String,
  },
  createAdAt: {
    type: String,
    default: date,
  },
});

module.exports = mongoose.model("Respuesta", RespuestaSchema);
