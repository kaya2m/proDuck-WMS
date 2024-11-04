const { body } = require('express-validator');

const supplierValidationRules = () => {
    return [
        body('name')
            .notEmpty().withMessage('Tedarikçi adı gerekli.')
            .trim(),

        body('contactPerson.name')
            .optional()
            .trim(),

        body('contactPerson.title')
            .optional()
            .trim(),

        body('contactPerson.phone')
            .optional()
            .isMobilePhone().withMessage('Geçerli bir telefon numarası girin.')
            .trim(),

        body('contactPerson.email')
            .optional()
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.')
            .trim(),

        body('phone')
            .optional()
            .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Telefon numarası geçerli bir formatta olmalıdır.')
            .trim(),

        body('email')
            .optional()
            .isEmail().withMessage('Geçerli bir e-posta adresi girin.')
            .trim(),

        body('address.street')
            .optional()
            .trim(),

        body('address.city')
            .optional()
            .trim(),

        body('address.state')
            .optional()
            .trim(),

        body('address.postalCode')
            .optional()
            .matches(/^\d{5}$/).withMessage('Posta kodu 5 haneli olmalıdır.')
            .trim(),

        body('address.country')
            .optional()
            .trim(),

        body('bankDetails.bankName')
            .optional()
            .trim(),

        body('bankDetails.accountNumber')
            .optional()
            .trim(),

        body('bankDetails.iban')
            .optional()
            .matches(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/).withMessage('IBAN formatı geçerli değil.')
            .trim(),

        body('bankDetails.swiftCode')
            .optional()
            .trim(),

        body('products')
            .optional()
            .isArray().withMessage('Ürünler bir dizi olmalıdır.')
            .custom((products) => products.every(id => /^[a-fA-F0-9]{24}$/.test(id))).withMessage('Geçerli ürün ID\'leri girin.'),

        body('status')
            .optional()
            .isBoolean().withMessage('Durum değeri boolean olmalıdır.'),

        body('rating')
            .optional()
            .isFloat({ min: 1, max: 5 }).withMessage('Puan 1 ile 5 arasında olmalıdır.'),

        body('paymentTerms')
            .optional()
            .trim(),

        body('deliveryLeadTime')
            .optional()
            .isInt({ min: 0 }).withMessage('Teslim süresi 0 veya daha büyük bir tam sayı olmalıdır.'),

        body('tags')
            .optional()
            .isArray().withMessage('Etiketler bir dizi olmalıdır.')
            .custom((tags) => tags.every(tag => typeof tag === 'string')).withMessage('Etiketler string olmalıdır.'),

        body('notes')
            .optional()
            .trim()
    ];
};

module.exports = {
    supplierValidationRules
};
