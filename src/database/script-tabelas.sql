-- Execute este script no MySQL Workbench antes de testar o cadastro.
CREATE DATABASE ringue_brasil;
USE ringue_brasil;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario'
);

CREATE TABLE avaliacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    nota TINYINT NOT NULL,
    interesse ENUM('sim', 'nao') NOT NULL,
    comentario VARCHAR(250),
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_avaliacao_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    CONSTRAINT chk_avaliacao_nota CHECK (nota BETWEEN 1 AND 5)
);
