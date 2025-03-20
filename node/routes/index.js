var express = require("express");
var router = express.Router();

/* GET home page. Qua va reindirizzato alla cartella dove viene buildato il progetto */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
