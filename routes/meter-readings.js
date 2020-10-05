const express = require("express");
const router = express.Router();
const fs = require("fs");
const { MeterReading } = require("../modules/meter-reading");

const getData = (data) => {
  const lines = data.split("\n");
  lines.shift();//removing headers of the files
  const meterReadings = lines.map(line => {
    const reading = line.split(",");
    return new MeterReading(reading[0], reading[1], reading[2], reading[3]);
  });
  return meterReadings;
};

router.get("/", async (req, res) => {
  try {
    const path = "../rms/data/metering_data.csv";
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const meterReadings = getData(data);
      return res.status(200).json({
        count: meterReadings.length,
        meterReadings,
      });
    });
  } catch (err) {
    console.log(`Err: \n ${JSON.stringify(err)}`);
    return res.status(500).json({
      error: err,
    });
  }
});

router.get("/:serial_number", async (req, res) => {
  try {
    const { serial_number } = req.params;
    const path = "../rms/data/metering_data.csv";
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        throw err;
      }      
    
      const meterReadings = getData(data).filter(m => (m.Serial = serial_number));

      return res.status(200).json({
        count: meterReadings.length,
        meterReadings,
      });
    });
  } catch (err) {
    console.log(`Err: \n ${JSON.stringify(err)}`);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
