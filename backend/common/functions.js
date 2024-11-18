const { v4: uuidv4 } = require("uuid");
const Category = require("../models/categories.model");
const Supplier = require("../models/suppliers.model");
const StockCard = require("../models/stockCard.model");

function generateCustomerCode() {
  const prefix = "CSTMR";
  const randomSuffix = Math.floor(1000000 + Math.random() * 9000);
  return `${prefix}-${randomSuffix}`;
}
function generateBarcode() {
  return `BRCD-${uuidv4()}`;
}

function generateGtipCode() {
  return `GTIP-${uuidv4()}`;
}

async function generateProductCodeUnique(categoryId) {
  if (categoryId !== null) {
    const categoryCode = (await Category.findById(categoryId)).code;
    const stockNumber = (await StockCard.countDocuments({}))
      .toString()
      .padStart(6, "0");
    const year = new Date().getFullYear();

    return `${categoryCode}-${stockNumber}-${year}`;
  }
  return null;
}

module.exports = {
  generateCustomerCode,
  generateBarcode,
  generateGtipCode,
  generateProductCodeUnique,
};
