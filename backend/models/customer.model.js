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
      cityId: { type: Schema.Types.ObjectId, ref: "City" },
      districtId: { type: Schema.Types.ObjectId, ref: "District" },
      postalCode: String,
      countryId: { type: Schema.Types.ObjectId, ref: "Country" },
      address: String,
    },
    shippingAddress: {
      cityId: { type: Schema.Types.ObjectId, ref: "City" },
      districtId: { type: Schema.Types.ObjectId, ref: "District" },
      postalCode: String,
      countryId: { type: Schema.Types.ObjectId, ref: "Country" },
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
    currencyType: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
