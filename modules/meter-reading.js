class MeterReading {
  Serial;
  ReadingDateTimeUTC;
  WH;
  VARH;

  constructor(Serial, ReadingDateTimeUTC, WH, VARH) {
    this.Serial = Serial;
    this.ReadingDateTimeUTC = ReadingDateTimeUTC;
    this.WH = WH;
    this.VARH = VARH;
  }
}

module.exports.MeterReading = MeterReading;
