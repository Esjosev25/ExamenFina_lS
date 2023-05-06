const Candidato = require('../models/candidato');
const Fase = require('../models/fase');
const Voto = require('../models/voto');
const { response } = require('express');
const { daprPost, daprGet, daprGetAll } = require('../config/dapr');

const getVoto = async (req, res) => {
 const { daprUuid } = req.body;
 const voto = await daprGet(daprUuid);
 if (voto)
   return res.json({
     ok: true,
     voto,
   });
 return res.json({
   ok: false,
   msg: 'voto no encontrado',
 });
};
const getVotos = async (req, res) => {
  const votos = await Voto.find({});
  if (votos)
    return res.json({
      ok: true,
      votos,
    });
  return res.json({
    ok: false,
    msg: 'votos no encontrados',
  });
};

const postVoto = async (req, res = response) => {
  try {
    const fase = await Fase.findOne({ name: 'fase de votación' });
    if (!fase || !fase.status) {
      return res.status(400).json({
        ok: false,
        msg: 'No es fase de votar',
      });
    }

    const { dpi, dpiCandidato } = req.body;

    //validaciones al candidato
    const candidatoDB = await Candidato.findOne({ dpi: dpiCandidato });

    if (!candidatoDB && dpiCandidato != null)
      return res.status(400).json({
        ok: false,
        msg: 'No hay ningun candidato con ese dpi',
      });

    const daprUser = await daprGet(candidatoDB.daprUuid);
    if (!daprUser && dpiCandidato != null)
      return res.status(400).json({
        ok: false,
        msg: 'No hay ningun candidato con ese dpi',
      });
    //validaciones al votante
    console.log('VOTO')
     const alreadyVoted = await Voto.findOne({dpiVotante:dpi});
      if(alreadyVoted){
          alreadyVoted.status = false;
         const votoactualizado = await Voto.findByIdAndUpdate(
           alreadyVoted._id,
           alreadyVoted,
           {
             new: true,
           }
         );
        return res.status(400).json({
          ok: false,
          msg: 'voto nulo',
          votoactualizado,
        });
      }
    const voto = {
      dpi: req.body.dpi,
      candidato: candidatoDB.daprUuid,
      dateTime: Date().toLocaleString(),
      status:true,
    };

    daprVoto = await daprPost(voto);
    const votoDb = new Voto({ dpiVotante: dpi, daprUuid: daprVoto, status:true });
    await votoDb.save();

    return res.json({
      ok: true,
      
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
  getVotos,
  postVoto,
  getVoto
};
