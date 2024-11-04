const router = require('express').Router();
const Product = require('../models/product.model');
const { productValidationRules } = require('../validators/productValidator');
const validate = require('../middlewares/validate');
const authenticateToken = require('../middlewares/authenticate');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.post('/', authenticateToken, productValidationRules(), validate, async (req, res) => {
    const { code, name, description, categoryId, supplierId, unitPrice, costPrice, stockQuantity, reorderLevel, weight, dimensions, status, isDiscontinued, isInStock, sku, barcode, qrCode, variants, images, warehouseLocations, manufacturer, brand, model, warrantyPeriod, tags, releaseDate, expirationDate, notes } = req.body;
    try {
        let product = await Product.findOne({ code });
        if (product) {
            return res.status(400).json({ message: 'Bu ürün zaten var.' });
        }
        product = new Product({
            code,
            name,
            description,
            categoryId,
            supplierId,
            unitPrice,
            costPrice,
            stockQuantity,
            reorderLevel,
            weight,
            dimensions,
            status,
            isDiscontinued,
            isInStock,
            sku,
            barcode,
            qrCode,
            variants,
            images,
            warehouseLocations,
            manufacturer,
            brand,
            model,
            warrantyPeriod,
            tags,
            releaseDate,
            expirationDate,
            notes
        });
        await product.save();
        res.status(201).json({ message: 'Ürün başarıyla oluşturuldu.', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.put('/:id', authenticateToken, productValidationRules(), validate, async (req, res) => {
    const { code, name, description, categoryId, supplierId, unitPrice, costPrice, stockQuantity, reorderLevel, weight, dimensions, status, isDiscontinued, isInStock, sku, barcode, qrCode, variants, images, warehouseLocations, manufacturer, brand, model, warrantyPeriod, tags, releaseDate, expirationDate, notes } = req.body;
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
        Object.assign(product, {
            code,
            name,
            description,
            categoryId,
            supplierId,
            unitPrice,
            costPrice,
            stockQuantity,
            reorderLevel,
            weight,
            dimensions,
            status,
            isDiscontinued,
            isInStock,
            sku,
            barcode,
            qrCode,
            variants,
            images,
            warehouseLocations,
            manufacturer,
            brand,
            model,
            warrantyPeriod,
            tags,
            releaseDate,
            expirationDate,
            notes
        });
        await product.save();
        res.json({ message: 'Ürün başarıyla güncellendi.', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
        await product.remove();
        res.json({ message: 'Ürün başarıyla silindi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

module.exports = router;
