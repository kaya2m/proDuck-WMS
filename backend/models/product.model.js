const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    unitPrice: { type: Number, required: true },
    costPrice: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 0 },
    weight: { type: Number },
    dimensions: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 }
    },
    status: { type: Boolean, default: true },
    isDiscontinued: { type: Boolean, default: false },
    isInStock: { type: Boolean, default: true },
    sku: { type: String, trim: true },
    barcode: { type: String, trim: true },
    qrCode: { type: String, trim: true },
    variants: [{
        color: { type: String, trim: true },
        size: { type: String, trim: true },
        additionalPrice: { type: Number }
    }],
    images: [{ type: String }],
    warehouseLocations: [{
        locationId: { type: Schema.Types.ObjectId, ref: 'WarehouseLocation' },
        quantity: { type: Number, default: 0 }
    }],
    manufacturer: { type: String, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    warrantyPeriod: { type: Number, default: 12 },
    tags: [{ type: String, trim: true }],
    releaseDate: { type: Date },
    expirationDate: { type: Date },
    notes: { type: String, trim: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
