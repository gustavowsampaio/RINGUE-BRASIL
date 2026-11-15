var avaliacaoModel = require("../models/avaliacaoModel");

function cadastrar(req, res) {
    var usuario = req.session.usuario;

    if (!usuario) {
        return res.status(401).send("Faça login para enviar uma avaliação.");
    }

    var { nota, interesse, comentario } = req.body;

    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        return res.status(400).send("Escolha uma nota de 1 a 5.");
    }

    if (interesse !== "sim" && interesse !== "nao") {
        return res.status(400).send("Responda Sim ou Não.");
    }

    if (comentario != null &&
        (typeof comentario !== "string" || comentario.length > 250)) {
        return res.status(400).send("O comentário deve ter até 250 caracteres.");
    }

    var texto = comentario == null ? null : comentario.trim() || null;

    avaliacaoModel.cadastrar(usuario.id, nota, interesse, texto)
        .then(function () {
            return res.status(201).send("Avaliação enviada!");
        })
        .catch(function (erro) {
            console.log("Erro ao salvar avaliação:", erro);
            return res.status(500).send("Erro ao salvar a avaliação.");
        });
}

function listarComentarios(req, res) {
    var usuario = req.session.usuario;

    if (!usuario) {
        return res.status(401).send("Faça login para continuar.");
    }

    if (usuario.perfil !== "admin") {
        return res.status(403).send("Acesso restrito ao administrador.");
    }

    avaliacaoModel.listarComentarios()
        .then(function (comentarios) {
            return res.json(comentarios);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar comentários:", erro);
            return res.status(500).send("Erro ao buscar comentários.");
        });
}

function buscarResumo(req, res) {
    var usuario = req.session.usuario;

    if (!usuario) {
        return res.status(401).send("Faça login para continuar.");
    }

    if (usuario.perfil !== "admin") {
        return res.status(403).send("Acesso restrito ao administrador.");
    }

    avaliacaoModel.buscarResumo()
        .then(function (resultado) {
            return res.json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar resumo:", erro);
            return res.status(500).send("Erro ao buscar o resumo.");
        });
}

module.exports = { cadastrar, listarComentarios, buscarResumo };
