const debug = require('debug')('debug');

const { Areas, CovidData } = require('../models');

module.exports = {
  getData(req, res) {
    const { country } = req.params;
    return Areas
      .findAll({
        attributes: ['unique_id', 'name'],
        where: {
          name: country,
          area_type: 'COUNTRY',
        },
        include: [{
          model: CovidData,
          attributes: ['date', 'cases', 'deaths'],
          as: 'data',
          required: true,
        }],
      })
      .then((countries) => {
        if (countries.length !== 0) {
          res.status(200).send(countries);
        } else {
          res.status(400).send(`No country found with name ${country}`);
        }
      })
      .catch((error) => {
        debug(error);
        res.status(500).send(error);
      });
  },
};
