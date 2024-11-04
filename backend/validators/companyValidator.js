const { body } = require('express-validator');

const companyValidationRules = () => {
    return [
        body('name')
            .notEmpty().withMessage('Şirket adı gerekli.')
            .isLength({ min: 3 }).withMessage('Şirket adı en az 3 karakter olmalıdır.')
            .trim(),

        body('email')
            .notEmpty().withMessage('E-posta gerekli.')
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.')
            .trim(),

        body('phone')
            .notEmpty().withMessage('Telefon numarası gerekli.')
            .isMobilePhone().withMessage('Geçerli bir telefon numarası girin.')
            .trim(),

        body('address.street')
            .notEmpty().withMessage('Sokak bilgisi gerekli.')
            .trim(),

        body('address.city')
            .notEmpty().withMessage('Şehir bilgisi gerekli.')
            .trim(),

        body('address.postalCode')
            .notEmpty().withMessage('Posta kodu gerekli.')
            .isPostalCode('any').withMessage('Geçerli bir posta kodu girin.')
            .trim(),

        body('address.country')
            .notEmpty().withMessage('Ülke bilgisi gerekli.')
            .trim(),

        body('status')
            .isBoolean().withMessage('Durum değeri boolean olmalıdır.'),

        body('image')
            .optional()
            .isURL().withMessage('Geçerli bir URL girin.'),

        body('description')
            .optional()
            .isLength({ max: 500 }).withMessage('Açıklama en fazla 500 karakter olabilir.')
            .trim(),

        body('website')
            .optional()
            .isURL().withMessage('Geçerli bir web sitesi URL’si girin.')
            .trim(),

        body('warehouses')
            .optional()
            .isArray().withMessage('Depolar bir dizi olmalıdır.')
            .custom((warehouses) => {
                warehouses.forEach(id => {
                    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
                        throw new Error('Geçerli bir depo ObjectId girin.');
                    }
                });
                return true;
            })
    ];
};

module.exports = {
    companyValidationRules
};
