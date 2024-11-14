const router = require("express").Router();
const Warehouse = require("../models/warehouse.model");
const {
  warehouseValidationRules,
} = require("../validators/warehouseValidator");
const validate = require("../middlewares/validate");
const authenticateToken = require("../middlewares/authenticate");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

router.get("/search", authenticateToken, async (req, res) => {
  try {
    const query = req.query.query;
    const warehouses = await Warehouse.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(warehouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Depo bulunamadı." });
    }
    res.json(warehouse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

router.post(
  "/",
  authenticateToken,
  warehouseValidationRules(),
  validate,
  async (req, res) => {
    const {
      companyId,
      code,
      name,
      description,
      status,
      image,
      address,
      address2,
      phone,
      phone2,
      warehouseType,
      warehouseArea,
      warehouseCapacity,
      warehouseVolume,
      warehouseRackCount,
      warehouseGateCount,
    } = req.body;
    try {
      let warehouse = await Warehouse.findOne({ code });
      if (warehouse) {
        return res.status(400).json({ message: "Bu depo zaten var." });
      }

      warehouse = new Warehouse({
        companyId,
        code,
        name,
        description,
        status,
        image,
        address,
        address2,
        phone,
        phone2,
        warehouseType,
        warehouseArea,
        warehouseCapacity,
        warehouseVolume,
        warehouseRackCount,
        warehouseGateCount,
      });

      await warehouse.save();
      res
        .status(201)
        .json({ message: "Depo başarıyla oluşturuldu.", warehouse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  warehouseValidationRules(),
  validate,
  async (req, res) => {
    const {
      companyId,
      code,
      name,
      description,
      status,
      image,
      address,
      address2,
      phone,
      phone2,
      warehouseType,
      warehouseArea,
      warehouseCapacity,
      warehouseVolume,
      warehouseRackCount,
      warehouseGateCount,
    } = req.body;
    try {
      let warehouse = await Warehouse.findById(req.params.id);
      if (!warehouse) {
        return res.status(404).json({ message: "Depo bulunamadı." });
      }

      warehouse.companyId = companyId;
      warehouse.code = code;
      warehouse.name = name;
      warehouse.description = description;
      warehouse.status = status;
      warehouse.image = image;
      warehouse.address = address;
      warehouse.address2 = address2;
      warehouse.phone = phone;
      warehouse.phone2 = phone2;
      warehouse.warehouseType = warehouseType;
      warehouse.warehouseArea = warehouseArea;
      warehouse.warehouseCapacity = warehouseCapacity;
      warehouse.warehouseVolume = warehouseVolume;
      warehouse.warehouseRackCount = warehouseRackCount;
      warehouse.warehouseGateCount = warehouseGateCount;

      await warehouse.save();
      res.json({ message: "Depo başarıyla güncellendi.", warehouse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  }
);

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    let warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Depo bulunamadı." });
    }
    await Warehouse.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Depo başarıyla silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
