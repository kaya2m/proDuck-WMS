const { body } = require('express-validator');

const customerValidationRules = () => {
    return [
        body('customerCode')
            .notEmpty().withMessage('Müşteri kodu gerekli.')
            .trim()
            .isAlphanumeric().withMessage('Müşteri kodu yalnızca harf ve rakam içermelidir.'),

        body('name')
            .notEmpty().withMessage('Müşteri adı gerekli.')
            .trim(),

        body('contact.phone')
            .optional()
            .isMobilePhone().withMessage('Geçerli bir telefon numarası girin.'),

        body('contact.email')
            .notEmpty().withMessage('E-posta gerekli.')
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.')
            .trim(),

        body('contact.email2')
            .optional()
            .isEmail().withMessage('Geçerli bir ikinci e-posta adresi girin.')
            .trim(),

        body('billingAddress.street')
            .optional()
            .trim(),

        body('billingAddress.city')
            .optional()
            .trim(),

        body('billingAddress.postalCode')
            .optional()
            .isPostalCode('any').withMessage('Geçerli bir posta kodu girin.')
            .trim(),

        body('billingAddress.country')
            .optional()
            .trim(),

        body('shippingAddress.street')
            .optional()
            .trim(),

        body('shippingAddress.city')
            .optional()
            .trim(),

        body('shippingAddress.postalCode')
            .optional()
            .isPostalCode('any').withMessage('Geçerli bir posta kodu girin.')
            .trim(),

        body('shippingAddress.country')
            .optional()
            .trim(),

        body('postCode')
            .optional()
            .isPostalCode('any').withMessage('Geçerli bir posta kodu girin.')
            .trim(),

        body('companyName')
            .optional()
            .trim(),

        body('taxNumber')
            .optional()
            .isNumeric().withMessage('Vergi numarası sadece sayılardan oluşmalıdır.')
            .trim(),

        body('taxOffice')
            .optional()
            .trim(),

        body('idNumber')
            .optional()
            .isNumeric().withMessage('Kimlik numarası sadece sayılardan oluşmalıdır.')
            .trim(),

        body('notes')
            .optional()
            .isLength({ max: 500 }).withMessage('Notlar en fazla 500 karakter olabilir.')
            .trim(),

        body('status')
            .isBoolean().withMessage('Durum değeri boolean olmalıdır.')
    ];
};

module.exports = {
    customerValidationRules
};
