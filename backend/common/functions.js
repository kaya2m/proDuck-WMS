const { v4: uuidv4 } = require('uuid');

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


module.exports = { generateCustomerCode,generateBarcode,generateGtipCode };
