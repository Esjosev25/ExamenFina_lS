/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getVotos, postVoto,getVoto } = require('../controllers/voto');
router.get(
  '/',
 
  getVotos
);
router.get(
  '/byDaprUuid',
  check('daprUuid', 'El daprUuid es obligatorio').not().isEmpty(),
  getVoto
);
router.post(
  '/',
  [
    check('dpi', 'El dpi del votante').not().isEmpty(),
    check('dpiCandidato', 'dpiCandidato es obligatorio'),
    validarCampos,
  ],
  postVoto
);


module.exports = router;
