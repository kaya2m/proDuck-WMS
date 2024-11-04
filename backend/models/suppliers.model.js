const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    contactPerson: {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true, match: /.+\@.+\..+/ }
    },
    phone: { type: String, trim: true, match: /^\+?[1-9]\d{1,14}$/ },
    email: { type: String, trim: true, unique: true, match: /.+\@.+\..+/ },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true, match: /^\d{5}$/ },
        country: { type: String, trim: true }
    },
    bankDetails: {
        bankName: { type: String, trim: true },
        accountNumber: { type: String, trim: true },
        iban: { type: String, trim: true, match: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/ },
        swiftCode: { type: String, trim: true }
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: Boolean, default: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    paymentTerms: { type: String, trim: true },
    deliveryLeadTime: { type: Number, min: 0, default: 7 },
    tags: [{ type: String, trim: true }],
    notes: { type: String, trim: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Supplier', supplierSchema);
