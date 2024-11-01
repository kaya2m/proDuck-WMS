const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);
