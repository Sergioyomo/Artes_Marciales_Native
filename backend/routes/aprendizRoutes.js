// pedidoRoutes.js
const express = require('express');
const router = express.Router();
const aprendizController = require('../controllers/aprendizController');

router.get('/', aprendizController.getFilteredAprendiz);
 router.get('/:idAprendiz', aprendizController.getAprendizById);
 router.post('/', aprendizController.createAprendiz);
 router.put('/:idAprendiz', aprendizController.updateAprendiz);
 router.delete('/:idAprendiz', aprendizController.deleteAprendiz);

module.exports = router;
