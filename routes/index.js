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

router.get(["/prestations", "/services"], function (req, res, next) {
  res.render("presta", {
    styles: ["header", "presta", "buttons"],
    scripts: ["presta"],
    currentPage: "presta",
  });
});

router.get(["/transition", "sustainability"], function (req, res, next) {
  res.render("transition", {
    styles: ["header", "transition", "full-page-list", "buttons"],
    currentPage: "transition",
  });
});

router.get("/about", function (req, res, next) {
  res.render("about", {
    styles: ["header", "about", "full-page-list"],
    currentPage: "about",
  });
});

router.get("/contact", function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "contact",
  });
});

router.get(["/ressources", "/resources"], function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "ressources",
  });
});

module.exports = router;
