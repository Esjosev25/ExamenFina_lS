const Usuario = require('../models/usuario');
const { response } = require('express');
const { daprPost, daprGet, daprDelete } = require('../config/dapr');

const getUsuario = async (req, res) => {
  const { daprUuid } = req.body;
  const user = await daprGet(daprUuid);
  if (user)
    return res.json({
      ok: true,
      user,
    });
  return res.json({
    ok: false,
    msg: 'usuario no encontrado',
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
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const deleteUsuario = async (req, res) => {
  const { daprUuid } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ daprUuid });
    if (!usuarioDB)
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    await daprDelete(daprUuid);
    await Usuario.findByIdAndDelete(usuarioDB.id);

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
  getUsuario,
  postUsuario,
  deleteUsuario,
};
