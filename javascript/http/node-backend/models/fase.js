const { Schema, model } = require('mongoose');

const FaseSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});



module.exports = model('Fase', FaseSchema);
