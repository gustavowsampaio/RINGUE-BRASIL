var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/cadastrar", avaliacaoController.cadastrar);

module.exports = router;