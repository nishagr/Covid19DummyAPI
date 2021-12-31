const debug = require('debug')('debug');
const router = require('express').Router();

const { Redis } = require('../utils');
const { StatesController } = require('../controllers');

router.get('/', async (req, res, next) => {
  const key = `query:${req.query.query}`;
  const value = await Redis.client.get(key);
  if (value != null && value !== '{}') {
    debug(`Got Data from Cache : ${value}`);
    res.status(200).send(JSON.parse(value));
  } else next();
}, StatesController.query);

router.get('/:state', async (req, res, next) => {
  const key = `query:${req.params.state}`;
  const value = await Redis.client.get(key);
  if (value != null && value !== '{}') {
    debug(`Got Data from Cache : ${value}`);
    res.status(200).send(JSON.parse(value));
  } else next();
}, StatesController.getData);

module.exports = router;
