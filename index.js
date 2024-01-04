import express from "express";
import { I18n } from "i18n";
import path from "path";
const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const i18n = new I18n({
  locales: ["en", "hi"],
  directory: path.join(__dirname, "translation"),
  defaultLocale: "en",
});

app.use(i18n.init);

app.use(function (req, res, next) {
  i18n.setLocale(req, req.headers["accept-language"] || "en");

  next();
});

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/test", (req, res) => {
  res.send({
    message: res.__("message"),

    locale: req.locale,
  });
});
app.get("/login", (req, res) => {
  res.send({
    message: res.__("test"),

    locale: req.locale,
  });
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
