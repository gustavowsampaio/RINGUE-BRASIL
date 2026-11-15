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

module.exports = { cadastrar }