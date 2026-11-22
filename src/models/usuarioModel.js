var database = require("../database/config");

// Confere o login e retorna os dados da conta.
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email, perfil FROM usuario
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

// Cadastra os dados recebidos.
function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, senha]);
}

// Permite usar estas funções em outros arquivos.
module.exports = { autenticar, cadastrar };
