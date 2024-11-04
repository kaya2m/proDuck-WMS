const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true }
    },
    status: { type: Boolean, default: true }, 
    image: { type: String },
    description: { type: String, trim: true },
    website: { type: String, trim: true },
    warehouses: [{ type: Schema.Types.ObjectId, ref: 'Warehouse' }], 
}, {
    timestamps: true,
});

module.exports = mongoose.model('Company', companySchema);
