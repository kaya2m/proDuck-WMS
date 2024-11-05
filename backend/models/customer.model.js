const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    customerCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    contact: {
        phone: String,
        email: { type: String, match: /.+\@.+\..+/,  trim: true ,unique: true},
        email2: { type: String, match: /.+\@.+\..+/,  trim: true },
    },
    billingAddress: {
        street: String,
        city: String,
        district: String,
        postalCode: String,
        country: String
    },
    shippingAddress: {
        street: String,
        city: String,
        district: String,
        postalCode: String,
        country: String
    },
    postCode: { type: String, trim: true },
    companyName: { type: String, trim: true },
    taxNumber: { type: String, trim: true },
    taxOffice: { type: String, trim: true },
    idNumber: { type: String, trim: true },
    notes: { type: String, trim: true },
    status: { type: Boolean, default: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Customer', customerSchema);
