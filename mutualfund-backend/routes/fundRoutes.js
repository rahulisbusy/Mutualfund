const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { saveFund, getSavedFunds, deleteFund } = require('../controllers/fundController');

router.post('/save', auth, saveFund);
router.get('/saved', auth, getSavedFunds);
router.delete('/saved/:schemeCode', auth, deleteFund);

module.exports = router;
