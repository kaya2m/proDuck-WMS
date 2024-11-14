const router = require("express").Router();
const StockCard = require("../models/stockCard.model");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const stockCards = await StockCard.find();
    res.json(stockCards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", authenticateToken, async (req, res) => {
  try {
    const query = req.query.query;
    const stockCards = await StockCard.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(stockCards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const stockCard = await StockCard.findById(req.params.id);
    res.json(stockCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const stockCard = new StockCard(req.body);
    await stockCard.save();
    res.json(stockCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const stockCard = await StockCard.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(stockCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await StockCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Stok Kartı silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
