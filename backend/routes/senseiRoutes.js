// platoRoutes.js
const express = require('express');
const router = express.Router();
const senseiController = require('../controllers/senseiController');

router.get('/', senseiController.getFilteredSensei); 
router.get('/:idSensei', senseiController.getSenseiById);
router.post('/', senseiController.createSensei);
router.delete('/:idSensei', senseiController.deleteSensei);
router.put('/:idSensei', senseiController.updateSensei);


module.exports = router;
