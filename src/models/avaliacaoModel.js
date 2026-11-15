var database = require("../database/config");

function cadastrar(idUsuario, nota, interesse, comentario) {
    var instrucaoSql = `
        INSERT INTO avaliacao (fk_usuario, nota, interesse, comentario) VALUES
        (?, ?, ?, ?);
    `;


return database.executar(instrucaoSql, [
    idUsuario, nota, interesse, comentario
]);
}

function listarComentarios() {
    var instrucaoSql = `
        SELECT u.nome, a.nota, a.interesse, a.comentario, a.criado_em
        FROM avaliacao AS a
        JOIN usuario AS u ON u.id = a.fk_usuario
        WHERE a.comentario IS NOT NULL
        ORDER BY a.criado_em DESC, a.id DESC
        LIMIT 20;
    `

return database.executar(instrucaoSql);
}

module.exports = { cadastrar, listarComentarios }