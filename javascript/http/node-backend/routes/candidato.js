/**
 * Ruta: /api/Candidatos
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  getCandidato,
  postCandidato,
  deleteCandidato,
} = require('../controllers/candidato');

router.get(
  '/',
  [
    check('daprUuid', 'El daprUuid es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  getCandidato
);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El carnet es obligatorio').not().isEmpty(),
    check('dpi', 'El dpi es obligatorio').not().isEmpty(),
    check('partido', 'El partido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    
    validarCampos,
  ],
  postCandidato
);
router.delete(
  '/',
  [
    check('daprUuid', 'El daprUuid es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  deleteCandidato
);
module.exports = router;
