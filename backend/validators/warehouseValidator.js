const { body } = require('express-validator');

const warehouseValidationRules = () => {
    return [
        body('companyId')
            .notEmpty().withMessage('Şirket ID gerekli.')
            .isMongoId().withMessage('Geçerli bir şirket ID girin.'),

        body('code')
            .notEmpty().withMessage('Depo kodu gerekli.')
            .isLength({ min: 3 }).withMessage('Depo kodu en az 3 karakter olmalıdır.')
            .trim(),

        body('name')
            .notEmpty().withMessage('Depo adı gerekli.')
            .isLength({ min: 3 }).withMessage('Depo adı en az 3 karakter olmalıdır.')
            .trim(),

        body('description')
            .notEmpty().withMessage('Açıklama gerekli.')
            .trim(),

        body('status')
            .isBoolean().withMessage('Durum değeri boolean olmalıdır.'),

        body('image')
            .notEmpty().withMessage('Resim URL’si gerekli.')
            .isURL().withMessage('Geçerli bir URL girin.'),

        body('address')
            .notEmpty().withMessage('Adres gerekli.')
            .trim(),

        body('address2')
            .notEmpty().withMessage('İkinci adres gerekli.')
            .trim(),

        body('phone')
            .notEmpty().withMessage('Telefon numarası gerekli.')
            .isMobilePhone().withMessage('Geçerli bir telefon numarası girin.')
            .trim(),

        body('phone2')
            .notEmpty().withMessage('İkinci telefon numarası gerekli.')
            .isMobilePhone().withMessage('Geçerli bir ikinci telefon numarası girin.')
            .trim(),

        body('warehouseType')
            .notEmpty().withMessage('Depo tipi gerekli.')
            .trim(),

        body('warehouseArea')
            .notEmpty().withMessage('Depo alanı gerekli.')
            .isFloat({ gt: 0 }).withMessage('Depo alanı 0\'dan büyük olmalıdır.'),

        body('warehouseCapacity')
            .notEmpty().withMessage('Depo kapasitesi gerekli.')
            .isInt({ gt: 0 }).withMessage('Depo kapasitesi 0\'dan büyük bir tam sayı olmalıdır.'),

        body('warehouseVolume')
            .notEmpty().withMessage('Depo hacmi gerekli.')
            .trim(),

        body('warehouseRackCount')
            .notEmpty().withMessage('Raf sayısı gerekli.')
            .isInt({ gt: 0 }).withMessage('Raf sayısı 0\'dan büyük bir tam sayı olmalıdır.'),

        body('warehouseGateCount')
            .notEmpty().withMessage('Kapı sayısı gerekli.')
            .isInt({ gt: 0 }).withMessage('Kapı sayısı 0\'dan büyük bir tam sayı olmalıdır.')
    ];
};

module.exports = {
    warehouseValidationRules
};
