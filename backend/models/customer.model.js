const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    contact: {
      phone: String,
      phone2: String,
      email: { type: String, match: /.+\@.+\..+/, trim: true, unique: true },
      email2: { type: String, match: /.+\@.+\..+/, trim: true },
    },
    billingAddress: {
      cityId: String,
      districtId: String,
      postalCode: String,
      countryId: String,
      address: String,
    },
    shippingAddress: {
      cityId: String,
      districtId: String,
      postalCode: String,
      countryId: String,
      address: String,
    },
    postCode: { type: String, trim: true },
    companyName: { type: String, trim: true },
    taxNumber: { type: String, trim: true },
    taxOffice: { type: String, trim: true },
    idNumber: { type: String, trim: true },
    sector: { type: String, trim: true },
    paymentMethod: { type: String, trim: true },
    notes: { type: String, trim: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
