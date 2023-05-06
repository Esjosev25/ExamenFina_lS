const Fase = require('../models/fase');
const { response } = require('express');
const Candidato = require('../models/candidato');
const Voto = require('../models/voto');
const getReporte = async (req, res) => {
const votosnulos = (await Voto.find({status:false})).length;
const votos = (await Voto.find({})).length;
const candidatos = (await Candidato.find({})).length;

   return res.json({
     ok: true,
     votosnulos,
     totalvotos:votos,
     candidatos,
   });
};


module.exports = {
  getReporte,
  
};
