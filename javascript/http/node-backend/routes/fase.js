/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  getFase,
  putFase,
} = require('../controllers/fase');

router.get('/', getFase);
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').isBoolean(),
    validarCampos,
  ],
  putFase
);
router.put(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').isBoolean(),
    validarCampos,
  ],
  putFase
);

module.exports = router;
