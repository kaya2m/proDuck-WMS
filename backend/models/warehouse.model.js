const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true }, // Şirket ilişkisi
   code: { type: String, required: true , unique: true , trim: true, minlength: 3},
    name: { type: String, required: true , unique: true , trim: true, minlength: 3},
    description: { type: String, required: true , trim: true},
    status: { type: Boolean, default: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String, required: true },
    phone: { type: String, required: true },
    phone2: { type: String, required: true },
    companyId: { type: String, required: true },
    warehouseType: { type: String, required: true },
    warehouseArea: { type: Number , required: true },
    warehouseCapacity: { type: Number, required: true },
    warehouseVolume: { type: String, required: true },
    warehouseRackCount: { type: String, required: true },
    warehouseGateCount: { type: String, required: true },
}, {
    timestamps: true,
});
module.exports = mongoose.model('WareHouse', warehouseSchema);