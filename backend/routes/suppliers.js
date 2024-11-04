const router = require('express').Router();
const Supplier = require('../models/suppliers.model');
const { supplierValidationRules } = require('../validators/supplierValidator');
const validate = require('../middlewares/validate');
const authenticateToken = require('../middlewares/authenticate');


router.get('/', authenticateToken, async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Tedarikçi bulunamadı.' });
        }
        res.json(supplier);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.post('/', authenticateToken, supplierValidationRules(), validate, async (req, res) => {
    const { name, contactPerson, phone, email, address, bankDetails, products, status, rating, paymentTerms, deliveryLeadTime, tags, notes } = req.body;
    try {
        let supplier = await Supplier.findOne({ name });
        if (supplier) {
            return res.status(400).json({ message: 'Bu tedarikçi zaten var.' });
        }

        supplier = new Supplier({
            name,
            contactPerson,
            phone,
            email,
            address,
            bankDetails,
            products,
            status,
            rating,
            paymentTerms,
            deliveryLeadTime,
            tags,
            notes
        });
        await supplier.save();
        res.status(201).json({ message: 'Tedarikçi başarıyla oluşturuldu.', supplier });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.put('/:id', authenticateToken, supplierValidationRules(), validate, async (req, res) => {
    const { name, contactPerson, phone, email, address, bankDetails, products, status, rating, paymentTerms, deliveryLeadTime, tags, notes } = req.body;
    try {
        let supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Tedarikçi bulunamadı.' });
        }

        supplier.name = name;
        supplier.contactPerson = contactPerson;
        supplier.phone = phone;
        supplier.email = email;
        supplier.address = address;
        supplier.bankDetails = bankDetails;
        supplier.products = products;
        supplier.status = status;
        supplier.rating = rating;
        supplier.paymentTerms = paymentTerms;
        supplier.deliveryLeadTime = deliveryLeadTime;
        supplier.tags = tags;
        supplier.notes = notes;

        await supplier.save();
        res.json({ message: 'Tedarikçi başarıyla güncellendi.', supplier });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        let supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Tedarikçi bulunamadı.' });
        }
        await Supplier.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Tedarikçi başarıyla silindi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

module.exports = router;
