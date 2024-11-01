const { body } = require('express-validator');

const registerValidationRules = () => {
    return [
        body('username')
            .notEmpty().withMessage('Kullanıcı adı gerekli.')
            .isLength({ min: 3 }).withMessage('Kullanıcı adı en az 3 karakter olmalıdır.'),
        body('email')
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.'),
        body('password')
            .isLength({ min: 6 }).withMessage('Şifre en az 8 karakter olmalıdır.')
            .matches(/\d/).withMessage('Şifre en az bir rakam içermelidir.')
    ];
};

const loginValidationRules = () => {
    return [
        body('email')
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.'),
        body('password')
            .notEmpty().withMessage('Şifre gerekli.')
    ];
}

module.exports = {
    registerValidationRules,
    loginValidationRules
};
