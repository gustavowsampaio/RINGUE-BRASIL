var database = require("../database/config");

// Cadastra os dados recebidos.
function cadastrar(idUsuario, nota, interesse, comentario) {
    var instrucaoSql = `
        INSERT INTO avaliacao (fk_usuario, nota, interesse, comentario) VALUES
        (?, ?, ?, ?);
    `;


return database.executar(instrucaoSql, [
    idUsuario, nota, interesse, comentario
]);
}

// Busca os comentários mais recentes.
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

// Busca os totais e a média das avaliações.
function buscarResumo() {
    var instrucaoSql = `
        SELECT
            COUNT(*) AS total,
            ROUND(AVG(nota), 1) AS media,
            COUNT(CASE WHEN nota = 1 THEN 1 END) AS nota1,
            COUNT(CASE WHEN nota = 2 THEN 1 END) AS nota2,
            COUNT(CASE WHEN nota = 3 THEN 1 END) AS nota3,
            COUNT(CASE WHEN nota = 4 THEN 1 END) AS nota4,
            COUNT(CASE WHEN nota = 5 THEN 1 END) AS nota5,
            COUNT(CASE WHEN interesse = 'sim' THEN 1 END) AS totalSim,
            COUNT(CASE WHEN interesse = 'nao' THEN 1 END) AS totalNao
        FROM avaliacao;
    `;

    return database.executar(instrucaoSql);
}

// Permite usar estas funções em outros arquivos.
module.exports = { cadastrar, listarComentarios, buscarResumo };