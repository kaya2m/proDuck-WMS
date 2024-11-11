function generateCustomerCode() {
  const prefix = "CSTMR";
  const randomSuffix = Math.floor(1000000 + Math.random() * 9000); // Generates a 4-digit random number
  return `${prefix}-${randomSuffix}`;
}


module.exports = { generateCustomerCode };
