const debug = require('debug')('debug');
const { Op } = require('sequelize');

const { PORT } = process.env;

const { Redis } = require('../utils');
const { Areas, CovidData } = require('../models');

module.exports = {
  async query(req, res) {
    const { query } = req.query;

    Areas
      .findAll({
        attributes: ['unique_id', 'name'],
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
          area_type: 'STATE',
        },
      })
      .then(async (elements) => {
        if (elements.length === 0) {
          res.status(400).send(`No state found with name ${query}`);
          return;
        }
        const states = [];
        elements.forEach((element) => {
          const state = element.dataValues;
          state.url = encodeURI(`http://localhost:${PORT}/states/${state.name}`);
          states.push(state);
        });
        res.status(200).send(states);
        const key = `query:${query}`;
        await Redis.client.set(key, JSON.stringify(states));
        await Redis.client.expireAt(key, Date.now() + 10 * 60 * 1000);
      })
      .catch((error) => {
        debug(error);
        res.status(500).send(error);
      });
  },
  async getData(req, res) {
    const { state } = req.params;
    Areas
      .findAll({
        attributes: ['unique_id', 'name'],
        where: {
          name: state,
          area_type: 'STATE',
        },
        include: [{
          model: CovidData,
          attributes: ['date', 'cases', 'deaths'],
          as: 'data',
          required: true,
        }],
      })
      .then(async (states) => {
        if (states.length !== 0) {
          res.status(200).send(states);
          const key = `getData:${state}`;
          await Redis.client.set(key, JSON.stringify(states));
          await Redis.client.expireAt(key, Date.now() + 10 * 60 * 1000);
        } else {
          res.status(400).send(`No state found with name ${state}`);
        }
      })
      .catch((error) => {
        debug(error);
        res.status(500).send(error);
      });
  },
};
