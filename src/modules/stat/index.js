const router = require('express').Router();
const statController = require('./controllers/stat-controller');

router.route('/')
  .get(statController.today)

module.exports = router;