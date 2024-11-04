const { body } = require('express-validator');

const categoryValidationRules = () => {
    return [
        body('name')
            .notEmpty().withMessage('Kategori adı gerekli.')
            .isLength({ min: 3 }).withMessage('Kategori adı en az 3 karakter olmalıdır.'),
        body('description').notEmpty().withMessage('Açıklama gerekli.'),
    ];
}
module.exports = {
    categoryValidationRules,
};