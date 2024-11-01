const roleSchema = new Schema({
    roleName: { type: String, required: true, unique: true },
    description: { type: String, trim: true },
    permissions: [String],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', roleSchema);
