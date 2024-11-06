const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    sehir_id: { type: Number, required: true, unique: true, trim: true },
    sehir_adi: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("City", citySchema);
