const express = require('express');
const router = express.Router();
const translationController = require('./controllers/translation-controller');

router.post('/', translationController.translateWord);

module.exports = router;