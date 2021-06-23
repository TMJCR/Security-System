const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  date: { type: Date, default: Date },
  log: String,
  type: String,
  equipment: String,
});

const ActivityModel = mongoose.model("ActivitySchema", activitySchema);

module.exports = ActivityModel;
