const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    ilce_id: { type: String, required: true, unique: true, trim: true },
    ilce_adi: { type: String, required: true, trim: true },
    sehir_id: { type: String, required: true, trim: true },
}, {
    timestamps: true,
}); 

module.exports = mongoose.model('District', districtSchema);