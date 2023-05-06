/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getFases, getFase, putFase, postFase } = require('../controllers/fase');
router.get('/', getFases);
router.get('/byDaprUuid', getFase);
router.post(
  '/',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').isBoolean(),
    validarCampos,
  ],
  postFase
);
router.put(
  '/',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').isBoolean(),
    validarCampos,
  ],
  putFase
);

module.exports = router;
