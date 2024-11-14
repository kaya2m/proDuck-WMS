const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true }, 
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    description: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    phone: { type: String, required: true },
    phone2: { type: String },
    warehouseType: { type: String, required: true },
    warehouseArea: { type: Number, required: true },
    warehouseCapacity: { type: Number, required: true },
    warehouseVolume: { type: Number, required: true },
    warehouseRackCount: { type: Number, required: true },
    warehouseGateCount: { type: Number, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    managerName: { type: String },
    managerContact: { type: String },
    workingHours: { type: String },
    securityLevel: { type: String },
    securityFeatures: { type: [String] },
    isClimateControlled: { type: Boolean, default: false },
    temperatureRange: { type: String },
    operationalCost: { type: Number },
    maintenanceCost: { type: Number },
    status: { type: Boolean, default: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
