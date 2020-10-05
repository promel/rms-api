const express = require('express');

const meterReadingsRouter = require('./routes/meter-readings.js');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(express.json());

app.use('/api/meterReadings', meterReadingsRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Running server in ${process.env.NODE_ENV} on port ${PORT}`)
);
