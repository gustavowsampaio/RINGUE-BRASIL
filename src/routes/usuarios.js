var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Direciona o cadastro para o controller.
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

// Direciona o login para o controller.
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;
