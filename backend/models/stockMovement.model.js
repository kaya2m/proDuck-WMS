const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
  {
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
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
    movementType: {
      type: String,
      enum: ["IN", "OUT", "TRANSFER"],
      required: true,
    },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: { type: String },
    additionalInfo: {
      notes: { type: String },
      referenceNumber: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockMovement", stockMovementSchema);
