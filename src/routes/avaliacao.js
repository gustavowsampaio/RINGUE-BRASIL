var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");

// Envia o cadastro para o controller.
router.post("/cadastrar", avaliacaoController.cadastrar);
// Direciona a consulta dos comentários.
router.get("/comentarios", avaliacaoController.listarComentarios);
// Direciona a consulta do resumo.
router.get("/resumo", avaliacaoController.buscarResumo);

// Permite usar estas funções em outros arquivos.
module.exports = router;