var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { styles: ["header", "home", "buttons"] });
});

router.get("/prestations", function (req, res, next) {
  res.render("presta", { styles: ["header", "presta", "buttons"] });
});

module.exports = router;
