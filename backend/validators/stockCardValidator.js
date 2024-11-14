const { body } = require('express-validator');

const stockCardValidator = [
  body('productCode')
    .isString()
    .withMessage('Ürün kodu bir string olmalıdır.')
    .notEmpty()
    .withMessage('Ürün kodu gereklidir.'),
  
  body('productName')
    .isString()
    .withMessage('Ürün adı bir string olmalıdır.')
    .notEmpty()
    .withMessage('Ürün adı gereklidir.'),
  
  body('category')
    .optional()
    .isString()
    .withMessage('Kategori bir string olmalıdır.'),
  
  body('brand')
    .optional()
    .isString()
    .withMessage('Marka bir string olmalıdır.'),
  
  body('model')
    .optional()
    .isString()
    .withMessage('Model bir string olmalıdır.'),
  
  body('unit')
    .optional()
    .isString()
    .withMessage('Birim bir string olmalıdır.'),
  
  body('dimensions.width')
    .optional()
    .isNumeric()
    .withMessage('Genişlik bir sayı olmalıdır.'),
  
  body('dimensions.height')
    .optional()
    .isNumeric()
    .withMessage('Yükseklik bir sayı olmalıdır.'),
  
  body('dimensions.depth')
    .optional()
    .isNumeric()
    .withMessage('Derinlik bir sayı olmalıdır.'),
  
  body('pricing.purchasePrice')
    .optional()
    .isNumeric()
    .withMessage('Alış fiyatı bir sayı olmalıdır.'),
  
  body('pricing.salePrice')
    .optional()
    .isNumeric()
    .withMessage('Satış fiyatı bir sayı olmalıdır.'),
  
  body('pricing.taxRate')
    .optional()
    .isNumeric()
    .withMessage('Vergi oranı bir sayı olmalıdır.'),
  
  body('pricing.discountRates')
    .optional()
    .isArray()
    .withMessage('İndirim oranları bir dizi olmalıdır.')
    .custom((value) => value.every(rate => typeof rate === 'number'))
    .withMessage('İndirim oranları sayılardan oluşmalıdır.'),
  
  body('supplier')
    .isMongoId()
    .withMessage('Tedarikçi geçerli bir Mongo ID olmalıdır.')
    .notEmpty()
    .withMessage('Tedarikçi gereklidir.'),
  
  body('additionalInfo.notes')
    .optional()
    .isString()
    .withMessage('Notlar bir string olmalıdır.'),
  
  body('additionalInfo.warrantyPeriod')
    .optional()
    .isNumeric()
    .withMessage('Garanti süresi bir sayı olmalıdır.'),
  
  body('additionalInfo.color')
    .optional()
    .isString()
    .withMessage('Renk bir string olmalıdır.'),
  
  body('additionalInfo.size')
    .optional()
    .isString()
    .withMessage('Boyut bir string olmalıdır.'),
  
  body('additionalInfo.material')
    .optional()
    .isString()
    .withMessage('Malzeme bir string olmalıdır.'),
  
  body('minLevel')
    .optional()
    .isNumeric()
    .withMessage('Minimum seviye bir sayı olmalıdır.'),
  
  body('maxLevel')
    .optional()
    .isNumeric()
    .withMessage('Maksimum seviye bir sayı olmalıdır.'),
  
  body('criticalLevel')
    .optional()
    .isNumeric()
    .withMessage('Kritik seviye bir sayı olmalıdır.'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Aktiflik durumu bir boolean olmalıdır.'),
  
  body('expiryDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Son kullanma tarihi geçerli bir tarih olmalıdır.'),
  
  body('costingMethod')
    .optional()
    .isIn(['FIFO', 'LIFO', 'Average'])
    .withMessage('Maliyetlendirme yöntemi geçerli bir değer olmalıdır.'),
];

module.exports = stockCardValidator;
