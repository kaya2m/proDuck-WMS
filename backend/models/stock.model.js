const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    stockCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StockCard",
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    currentQuantity: { type: Number, default: 0 },
    barcodeNumber: { type: String },
    gtipCode: { type: String },
    unit: { type: String, required: true },
    location: { type: String },
    lotNumber: { type: String },
    batchNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
