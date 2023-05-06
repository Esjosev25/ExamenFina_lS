const { Schema, model } = require('mongoose');

const CandidatoSchema = Schema({
  dpi: {
    type: Number,
    required: true,
    unique: true,
  },
  daprUuid: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
});

CandidatoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Candidato', CandidatoSchema);
