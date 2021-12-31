const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// CORS
app.use(cors());

// Body Limits
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);

// Routes

app.use('/', routes.CountryRouter);
app.use('/states', routes.StateRouter);

module.exports = app;
