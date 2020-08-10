let express = require("express");
let nodemailer = require("nodemailer");
let router = express.Router();
require("dotenv").config();

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

router.get(["/transition", "/sustainability"], function (req, res, next) {
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

router.get(["/legal"], function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "legal",
  });
});

router.post("/send-email", function (req, res, next) {
  let {
    email,
    name,
    number,
    type,
    quantity,
    message,
    hours,
    requestedService,
  } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: `demande devis <${email}>`,
      to: process.env.MY_EMAIL,
      subject: `< FREQUENCE 440 > Nouvelle demande de devis de ${name}`,
      text: message,
      html: `
      <p>Prestation demandée: ${requestedService}</p>
      <p>Nom du client: ${name}</p>
      <p>Email du client: ${email}</p>
      <p>Numéro de téléphone: ${number}</p>
      <p>Nom de l'Entreprise ou Ecole du supérieur: ${type}</p>
      <p>Nombre de personnes:${quantity}</p>
      <p>Message: ${message}</p>
      <p>Horaires: ${hours}</p>
      `,
    })
    .then(() =>
      res.json([
        "Votre demande a été envoyée avec succès",
        "Your email has been successfully sent",
      ])
    )
    .catch(() =>
      res.json([
        "Une erreur s'est produite, veuillez réessayer",
        "An error occured, please try again",
      ])
    );
});

module.exports = router;
