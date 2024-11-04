const express = require('express');
const route = express.Router();
const Company = require('../models/company.model');
const { companyValidationRules } = require('../validators/companyValidator');
const validate = require('../middlewares/validate');
const authenticateToken = require('../middlewares/authenticate');

route.get('/', authenticateToken, async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

route.get('/:id', authenticateToken, async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Şirket bulunamadı.' });
        }
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

// route.get('/warehouses/:id', async (req, res) => {
//     try {
//         const companies = await Company.findById(req.params.id).populate('warehouses');
//         res.json(companies);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Sunucu hatası.' });
//     }
// }
// );

route.post('/', companyValidationRules(), validate, authenticateToken, async (req, res) => {
    const { name, email, phone, address, status, image, description, website, warehouses } = req.body;
    try {
        let company = await Company.findOne({ name });
        if (company) {
            return res.status(400).json({ message: 'Bu şirket zaten var.' });
        }

        company = new Company({
            name,
            email,
            phone,
            address,
            status,
            image,
            description,
            website,
            warehouses
        });

        await company.save();
        res.status(201).json({ message: 'Şirket başarıyla oluşturuldu.', company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

route.put('/:id', companyValidationRules(), validate, authenticateToken, async (req, res) => {
    const { name, email, phone, address, status, image, description, website, warehouses } = req.body;
    try {
        let company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Şirket bulunamadı.' });
        }
        company.name = name;
        company.email = email;
        company.phone = phone;
        company.address = address;
        company.status = status;
        company.image = image;
        company.description = description;
        company.website = website;
        company.warehouses = warehouses;

        await company.save();
        res.json({ message: 'Şirket başarıyla güncellendi.', company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

route.delete('/:id', authenticateToken, async (req, res) => {
    try {
        let company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Şirket bulunamadı.' });
        }
        await Company.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Şirket başarıyla silindi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

module.exports = route;
