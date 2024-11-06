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

router.route("/district/:id").get((req, res) => {
  district
    .find({ sehir_id: req.params.id })
    .then((district) => {
      if (district) {
        res.json(district);
      } else {
        res.status(404).json("Hata: Şehir bulunamadı");
      }
    })
    .catch((err) => res.status(400).json("Hata: " + err));
});

module.exports = router;
