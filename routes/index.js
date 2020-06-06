var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", {
    styles: ["header", "home", "buttons"],
    scripts: ["home"],
    currentPage: "home",
  });
});

router.get("/prestations", function (req, res, next) {
  res.render("presta", {
    styles: ["header", "presta", "buttons"],
    scripts: ["presta"],
    currentPage: "presta",
  });
});

router.get("/transition", function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "transition",
  });
});

router.get("/about", function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "about",
  });
});

router.get("/contact", function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "contact",
  });
});

router.get("/ressources", function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "ressources",
  });
});

module.exports = router;
