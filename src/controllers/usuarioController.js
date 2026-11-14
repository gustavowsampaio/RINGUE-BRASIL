var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (typeof email !== "string" || typeof senha !== "string" || email.trim() === "" || senha === "") {
        return res.status(400).send("Preencha e-mail e senha.");
    }

    usuarioModel.autenticar(email.trim(), senha)
        .then(function (resultado) {
            if (resultado.length === 1) {
                return res.json({
                    id: resultado[0].id,
                    nome: resultado[0].nome,
                    email: resultado[0].email
                });
            }
            return res.status(403).send("E-mail e/ou senha inválidos.");
        })
        .catch(function (erro) {
            console.log("Erro ao realizar login:", erro);
            return res.status(500).send("Erro ao realizar login.");
        });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (typeof nome !== "string" || typeof email !== "string" || typeof senha !== "string" ||
        nome.trim() === "" || email.trim() === "" || senha === "") {
        return res.status(400).send("Preencha todos os campos.");
    }

    if (nome.length > 100 || email.length > 100 || senha.length > 255) {
        return res.status(400).send("Um dos campos ultrapassou o tamanho permitido.");
    }

    usuarioModel.cadastrar(nome.trim(), email.trim(), senha)
        .then(function (resultado) {
            return res.status(201).json({ id: resultado.insertId });
        })
        .catch(function (erro) {
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Este e-mail já está cadastrado.");
            }
            console.log("Erro ao cadastrar:", erro);
            return res.status(500).send("Erro ao realizar cadastro.");
        });
}

module.exports = { autenticar, cadastrar };
