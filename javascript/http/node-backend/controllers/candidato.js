const Candidato = require('../models/candidato');
const Fase = require('../models/fase');
const { response } = require('express');
const { daprPost, daprGet, daprDelete } = require('../config/dapr');

const getCandidato = async (req, res) => {
  const { daprUuid } = req.body;
  const user = await daprGet(daprUuid);
  if (user)
    return res.json({
      ok: true,
      user,
    });
  return res.json({
    ok: false,
    msg: 'Candidato no encontrado',
  });
};

const postCandidato = async (req, res = response) => {
  try {
    console.log('Hola')
    const fase = await Fase.findOne({ name:'crear candidatos' });
    if(!fase|| !fase.status){
       return res.status(400).json({
         ok: false,
         msg: 'No es fase de crear candidato',
       });
    }
    const { dpi } = req.body;
   
    const existeDpi = await Candidato.findOne({ dpi });

    if (existeDpi)
      return res.status(400).json({
        ok: false,
        msg: 'El Dpi ya está registrado',
      });
    const daprUuid = await daprPost(req.body);

    const user = {
      dpi: req.body.dpi,
      daprUuid,
      nombre: req.body.nombre,
    };
    const candidato = new Candidato(user);

    // Guardar Candidatos en mongo
    await candidato.save();

    return res.json({
      ok: true,
      candidato,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const deleteCandidato = async (req, res) => {
  const { daprUuid } = req.body;

  try {
    const usuarioDB = await Candidato.findOne({ daprUuid });
    if (!usuarioDB)
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    await daprDelete(daprUuid);
    await Candidato.findByIdAndDelete(usuarioDB.id);

    return res.json({
      ok: true,
      msg: `Usuario con ${daprUuid} eliminado`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

module.exports = {
  getCandidato,
  postCandidato,
  deleteCandidato,
};
