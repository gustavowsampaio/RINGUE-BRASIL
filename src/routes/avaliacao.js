var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/cadastrar", avaliacaoController.cadastrar);
router.get("/comentarios", avaliacaoController.listarComentarios);

module.exports = router;