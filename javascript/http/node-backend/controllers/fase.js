const Fase = require('../models/fase');
const { response } = require('express');

const getFase = async (req, res) => {
  const { name } = req.body;
  const fase = await Fase.findOne({ name });
  if (fase)
    return res.json({
      ok: true,
      fase,
    });
  return res.json({
    ok: false,
    msg: 'usuario no encontrado',
  });
};

const postFase = async (req, res = response) => {
  try {
    console.log(req.body);

    const { name } = req.body;
    const existeFase = await Fase.findOne({ name });

    if (existeFase)
      return res.status(400).json({
        ok: false,
        msg: 'Fase no encontrada',
      });

    const fase = new Fase(req.body);

    // Actualizar fase en mongo
    await fase.save();

    return res.json({
      ok: true,
      fase,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const putFase = async (req, res = response) => {
  try {
    const { name } = req.body;
    const faseDB = await Fase.findOne({ name });
    if (!faseDB)
      return res.status(404).json({
        ok: false,
        msg: 'Fase no existe',
      });

    //Actualizacion

    const faseActualizado = await Fase.findByIdAndUpdate(faseDB._id, req.body, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      usuario: faseActualizado,
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
  getFase,
  putFase,
  postFase,
};
