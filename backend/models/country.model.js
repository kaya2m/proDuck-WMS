
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    
    country_id : { type: Number, required: true, unique: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    dial_code : { type: String, required: true, unique: true, trim: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Country', countrySchema);