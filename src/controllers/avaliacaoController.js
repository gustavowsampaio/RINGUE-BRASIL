var avaliacaoModel = require("../models/avaliacaoModel");

// Cadastra os dados recebidos.
function cadastrar(req, res) {
    var { idUsuario, nota, interesse, comentario } = req.body;

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        return res.status(400).send("Informe um usuário válido.");
    }
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

    avaliacaoModel.cadastrar(idUsuario, nota, interesse, texto)
        .then(function () {
            return res.status(201).send("Avaliação enviada!");
        })
        .catch(function (erro) {
            if (erro.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(400).send("Usuário não encontrado.");
            }
            console.log("Erro ao salvar avaliação:", erro);
            return res.status(500).send("Erro ao salvar a avaliação.");
        });
}

// Busca os comentários mais recentes.
function listarComentarios(req, res) {
    avaliacaoModel.listarComentarios()
        .then(function (comentarios) {
            return res.json(comentarios);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar comentários:", erro);
            return res.status(500).send("Erro ao buscar comentários.");
        });
}

// Busca os totais e a média das avaliações.
function buscarResumo(req, res) {
    avaliacaoModel.buscarResumo()
        .then(function (resultado) {
            return res.json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar resumo:", erro);
            return res.status(500).send("Erro ao buscar o resumo.");
        });
}

// Permite usar estas funções em outros arquivos.
module.exports = { cadastrar, listarComentarios, buscarResumo };
