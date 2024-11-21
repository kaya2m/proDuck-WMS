const { body } = require("express-validator");

const warehouseValidationRules = () => {
  return [
    body("companyId")
      .notEmpty()
      .withMessage("Şirket ID gerekli.")
      .isMongoId()
      .withMessage("Geçerli bir şirket ID girin."),

    body("name")
      .notEmpty()
      .withMessage("Depo adı gerekli.")
      .isLength({ min: 3 })
      .withMessage("Depo adı en az 3 karakter olmalıdır.")
      .trim(),

    body("description").notEmpty().withMessage("Açıklama gerekli.").trim(),
    body("address.countryId").notEmpty().withMessage("Ülke gerekli.").trim(),
    body("address.cityId").notEmpty().withMessage("İl gerekli.").trim(),
    body("address.district").notEmpty().withMessage("İlçe gerekli.").trim(),

    body("address.addressDetail")
      .notEmpty()
      .withMessage("Adres gerekli.")
      .trim(),

    body("contact.phone")
      .notEmpty()
      .withMessage("Telefon numarası gerekli.")
      .isMobilePhone()
      .withMessage("Geçerli bir telefon numarası girin.")
      .trim(),

    body("contact.phone2")
      .isMobilePhone()
      .withMessage("Geçerli bir ikinci telefon numarası girin.")
      .trim(),
  ];
};

module.exports = {
  warehouseValidationRules,
};
