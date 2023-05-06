/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();


const { getReporte,  } = require('../controllers/reportes');
router.get('/', getReporte);


module.exports = router;
