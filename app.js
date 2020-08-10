var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
// var flash = require("connect-flash"); // designed to keep messages between 2 http request/response cycles

// multi language
var i18n = require("i18n");
i18n.configure({
  locales: ["en", "fr"],
  cookie: "locale",
  defaultLocale: "fr",
  directory: __dirname + "/locales",
  objectNotation: true,
});

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// flash messages
// app.use(flash());
// app.use(require("./middlewares/exposeFlashMessage"));

// i18n set up
app.use(i18n.init);
//register hbs helpers in res.locals' context which provides this.locale
hbs.registerHelper("__", function () {
  return i18n.__.apply(this, arguments);
});
hbs.registerHelper("__n", function () {
  return i18n.__n.apply(this, arguments);
});

app.use("/", indexRouter);

// setting up cookie changes
app.get("/fr", function (req, res) {
  res.cookie("locale", "fr", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
});

app.get("/en", function (req, res) {
  res.cookie("locale", "en", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
