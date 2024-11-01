const supplierSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    contactPerson: { type: String },
    phone: { type: String },
    email: { type: String },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: Boolean, default: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Supplier', supplierSchema);
