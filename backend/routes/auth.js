const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { registerValidationRules } = require('../validators/userValidator');
const validate = require('../middlewares/validate');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', registerValidationRules(), validate, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});


router.post('/login', [
    body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin.'),
    body('password').notEmpty().withMessage('Şifre gerekli.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

module.exports = router;
