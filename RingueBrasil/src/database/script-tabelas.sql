-- Execute este script no MySQL Workbench antes de testar o cadastro.
CREATE DATABASE IF NOT EXISTS ringue_brasil;
USE ringue_brasil;

CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
