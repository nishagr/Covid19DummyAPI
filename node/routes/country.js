const router = require('express').Router();
const { CountryController } = require('../controllers');

router.get('/', (req, res, next) => {
  req.params.country = 'United States';
  next();
}, CountryController.getData);

module.exports = router;
