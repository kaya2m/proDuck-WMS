const mongoose = require("mongoose");

const stockCardSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    productCodeUnique: { type: String, required: true },
    category: { type: String },
    brand: { type: String },
    model: { type: String },
    unit: { type: String },
    dimensions: {
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
    },
    pricing: {
      purchasePrice: { type: Number },
      salePrice: { type: Number },
      taxRate: { type: Number },
      minDiscountRates: [{ type: Number }],
      maxDiscountRates: [{ type: Number }],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    additionalInfo: {
      notes: { type: String },
      warrantyPeriod: { type: Number },
      color: { type: String },
      size: { type: String },
      material: { type: String },
    },
    minLevel: { type: Number },
    maxLevel: { type: Number },
    criticalLevel: { type: Number },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date },
    costingMethod: {
      type: String,
      enum: ["FIFO", "LIFO", "Average"],
      default: "FIFO",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockCard", stockCardSchema);
