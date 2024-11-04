const { body } = require('express-validator');

const productValidationRules = () => {
    return [
        body('code')
            .notEmpty().withMessage('Ürün kodu gerekli.')
            .trim(),

        body('name')
            .notEmpty().withMessage('Ürün adı gerekli.')
            .trim(),

        body('description')
            .optional()
            .trim(),

        body('categoryId')
            .notEmpty().withMessage('Kategori ID gerekli.')
            .isMongoId().withMessage('Geçerli bir kategori ID girin.'),

        body('supplierId')
            .optional()
            .isMongoId().withMessage('Geçerli bir tedarikçi ID girin.'),

        body('unitPrice')
            .notEmpty().withMessage('Birim fiyat gerekli.')
            .isFloat({ gt: 0 }).withMessage("Birim fiyat 0'dan büyük olmalıdır."),

        body('costPrice')
            .optional()
            .isFloat({ gt: 0 }).withMessage("Maliyet fiyatı 0'dan büyük olmalıdır."),

        body('stockQuantity')
            .optional()
            .isInt({ min: 0 }).withMessage('Stok miktarı 0 veya daha büyük olmalıdır.'),

        body('reorderLevel')
            .optional()
            .isInt({ min: 0 }).withMessage('Yeniden sipariş seviyesi 0 veya daha büyük olmalıdır.'),

        body('weight')
            .optional()
            .isFloat({ gt: 0 }).withMessage("Ağırlık 0'dan büyük olmalıdır."),

        body('dimensions.length')
            .optional()
            .isFloat({ min: 0 }).withMessage('Uzunluk 0 veya daha büyük olmalıdır.'),

        body('dimensions.width')
            .optional()
            .isFloat({ min: 0 }).withMessage('Genişlik 0 veya daha büyük olmalıdır.'),

        body('dimensions.height')
            .optional()
            .isFloat({ min: 0 }).withMessage('Yükseklik 0 veya daha büyük olmalıdır.'),

        body('status')
            .isBoolean().withMessage('Durum değeri boolean olmalıdır.'),

        body('isDiscontinued')
            .isBoolean().withMessage('Durdurulmuş değeri boolean olmalıdır.'),

        body('isInStock')
            .isBoolean().withMessage('Stokta olup olmama değeri boolean olmalıdır.'),

        body('sku')
            .optional()
            .trim(),

        body('barcode')
            .optional()
            .trim(),

        body('qrCode')
            .optional()
            .trim(),

        body('variants.*.color')
            .optional()
            .trim(),

        body('variants.*.size')
            .optional()
            .trim(),

        body('variants.*.additionalPrice')
            .optional()
            .isFloat({ gt: 0 }).withMessage("Ek fiyat 0'dan büyük olmalıdır."),

        body('images')
            .optional()
            .isArray().withMessage('Resimler bir dizi olmalıdır.')
            .custom((images) => images.every(img => typeof img === 'string' && /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(img)))
            .withMessage('Resimler geçerli bir URL formatında olmalıdır.'),

        body('warehouseLocations.*.locationId')
            .optional()
            .isMongoId().withMessage('Geçerli bir depo konumu ID girin.'),

        body('warehouseLocations.*.quantity')
            .optional()
            .isInt({ min: 0 }).withMessage('Depo miktarı 0 veya daha büyük olmalıdır.'),

        body('manufacturer')
            .optional()
            .trim(),

        body('brand')
            .optional()
            .trim(),

        body('model')
            .optional()
            .trim(),

        body('warrantyPeriod')
            .optional()
            .isInt({ min: 0 }).withMessage('Garanti süresi 0 veya daha büyük bir tam sayı olmalıdır.'),

        body('tags')
            .optional()
            .isArray().withMessage('Etiketler bir dizi olmalıdır.')
            .custom((tags) => tags.every(tag => typeof tag === 'string')).withMessage('Etiketler string olmalıdır.'),

        body('releaseDate')
            .optional()
            .isISO8601().withMessage('Geçerli bir çıkış tarihi girin.'),

        body('expirationDate')
            .optional()
            .isISO8601().withMessage('Geçerli bir son kullanma tarihi girin.'),

        body('notes')
            .optional()
            .trim()
    ];
};

module.exports = {
    productValidationRules
};
