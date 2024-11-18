// stockRoutes.js

const express = require("express");
const router = express.Router();
const Stock = require("../models/stock.model");

router.post("/", async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (stock) {
      res.status(200).json(stock);
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedStock) {
      res.status(200).json(updatedStock);
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (deletedStock) {
      res.status(200).json({ message: "Stock item deleted" });
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
