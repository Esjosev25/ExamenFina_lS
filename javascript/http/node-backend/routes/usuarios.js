/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  getUsuario,
  postUsuario,
  deleteUsuario,
} = require('../controllers/usuarios');

router.get(
  '/',
  [
    check('daprUuid', 'El daprUuid es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  getUsuario
);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El carnet es obligatorio').not().isEmpty(),
    check('dpi', 'El dpi es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  postUsuario
);
router.delete(
  '/',
  [
    check('daprUuid', 'El daprUuid es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  deleteUsuario
);
module.exports = router;
