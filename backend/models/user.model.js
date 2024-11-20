const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    surname: { type: String, required: true, trim: true, minlength: 3 },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true, trim: true, minlength: 8 },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, required: true, default: 'user' },
    birthdate: { type: Date, required: false },
    date: { type: Date, required: true, default: Date.now },
    status: { type: Boolean, default: true },
    image: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
}, {
    timestamps: true,
});
module.exports = mongoose.model('User', userSchema);