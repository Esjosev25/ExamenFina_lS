const Usuario = require('../models/usuario');
const { response } = require('express');
const {daprPost}= require('../config/dapr');

const getUsuario = async (req, res) => {
  
const {daprUuid} = req.body;
const user = await daprGet(daprUuid);
  
  res.json({
    ok: true,
    user,
  });
};

const postUsuario = async (req, res = response) => {
  try {
    console.log(req.body);

    const { dpi } = req.body;
    const existeDpi = await Usuario.findOne({ dpi });

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
    const usuario = new Usuario(user);

    // Guardar Usuarios en mongo
    await usuario.save();

    return res.json({
      ok: true,
      usuario
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
  getUsuario,
  postUsuario,
};
