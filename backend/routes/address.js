const router = require("express").Router();
const country = require("../models/country.model");
const city = require("../models/city.model");
const district = require("../models/district.model");

router.route("/country").get((req, res) => {
  country
    .find()
    .then((country) => res.json(country))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/city").get((req, res) => {
  city
    .find()
    .then((city) => res.json(city))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/district/:id").get(async (req, res) => {
  if (req.params.id) {
    try {
      var citys = await city.findById(req.params.id);
      if (!citys) {
        return res.status(404).json("Hata: Şehir bulunamadı");
      }
      var cityId = citys.sehir_id;

      district
        .find({ sehir_id: cityId })
        .then((district) => {
          if (district.length > 0) {
            console.log(district);
            res.json(district);
          } else {
            res.status(404).json("Hata: İlçe bulunamadı");
          }
        })
        .catch((err) => res.status(400).json("Hata: " + err));
    } catch (err) {
      res.status(400).json("Hata: " + err);
    }
  } else {
    res.status(400).json("Hata: Geçersiz şehir ID");
  }
});

module.exports = router;
