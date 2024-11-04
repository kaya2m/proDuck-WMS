const route = require('express').Router();
const Category = require('../models/categories.model');
const { categoryValidationRules } = require('../validators/categoryValidator');
const validate = require('../middlewares/validate');
const authenticateToken = require('../middlewares/authenticate');

route.get('/', authenticateToken, async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}
);

route.post('/', authenticateToken, categoryValidationRules(), validate, async (req, res) => {
    const { name, description } = req.body;
    try {
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ message: 'Bu kategori zaten var.' });
        }
        category = new Category({
            name,
            description

        });
        await category.save();
        res.status(201).json({ message: 'Kategori başarıyla oluşturuldu.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}
);

route.put('/:id', authenticateToken, categoryValidationRules(), validate, async (req, res) => {
    const { name, description } = req.body;
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı.' });
        }
        category.name = name;
        category.description = description;

        await category.save();
        res.json({ message: 'Kategori başarıyla güncellendi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}
);

route.delete('/:id', authenticateToken, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı.' });
        }
        await Category.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Kategori başarıyla silindi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}
);

module.exports = route;