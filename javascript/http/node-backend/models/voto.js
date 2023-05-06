const { Schema, model } = require('mongoose');

const FaseSchema = Schema({
  dpiVotante: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  daprUuid: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});



module.exports = model('voto', FaseSchema);
