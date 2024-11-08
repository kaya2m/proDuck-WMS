const router = require("express").Router();
const Customer = require("../models/customer.model");
const { customerValidationRules } = require("../validators/customerValidator");
const validate = require("../middlewares/validate");
const authenticateToken = require("../middlewares/authenticate");
const { generateCustomerCode } = require("../common/functions");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Müşteri bulunamadı." });
    }
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

router.post(
  "/",
  authenticateToken,
  customerValidationRules(),
  validate,
  async (req, res) => {
    const {
      customerCode,
      name,
      contact,
      billingAddress,
      shippingAddress,
      postCode,
      companyName,
      taxNumber,
      taxOffice,
      idNumber,
      notes,
      status,
      sector,

      paymentMethod,
    } = req.body;
    try {
      let customer = await Customer.findOne({ "contact.email": contact.email });
      if (customer) {
        return res.status(400).json({ message: "Bu müşteri zaten var." });
      }
      customer = new Customer({
        customerCode: generateCustomerCode(),
        name,
        contact,
        billingAddress,
        shippingAddress,
        postCode,
        companyName,
        taxNumber,
        taxOffice,
        idNumber,
        notes,
        sector,
        paymentMethod,
        status,
      });
      await customer.save();
      res
        .status(201)
        .json({ message: "Müşteri başarıyla oluşturuldu.", customer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  customerValidationRules(),
  validate,
  async (req, res) => {
    const {
      name,
      contact,
      billingAddress,
      shippingAddress,
      postCode,
      companyName,
      taxNumber,
      taxOffice,
      idNumber,
      notes,
      status,
    } = req.body;
    try {
      let customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ message: "Müşteri bulunamadı." });
      }

      customer.name = name;
      customer.contact = contact;
      customer.billingAddress = billingAddress;
      customer.shippingAddress = shippingAddress;
      customer.postCode = postCode;
      customer.companyName = companyName;
      customer.taxNumber = taxNumber;
      customer.taxOffice = taxOffice;
      customer.idNumber = idNumber;
      customer.notes = notes;
      customer.status = status;

      await customer.save();
      res.json({ message: "Müşteri başarıyla güncellendi.", customer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  }
);

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Müşteri bulunamadı." });
    }
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Müşteri başarıyla silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
