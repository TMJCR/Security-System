const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  type: String,
  name: String,
  zone: Number,
  configuration: {},
  connectedCamera: {},
});

const EquipmentModel = mongoose.model("EquipmentSchema", equipmentSchema);

module.exports = EquipmentModel;
