DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS carros;
DROP TABLE IF EXISTS aluguel;
DROP TABLE IF EXISTS loggedin;

CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    historico TEXT
);

CREATE TABLE carros (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    modelo TEXT NOT NULL,
    marca TEXT NOT NULL,
    ano INTEGER NOT NULL,
    observation TEXT,
    valorDiaria FLOAT NOT NULL,
    statusCarro INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    imgCarro TEXT NOT NULL
);

CREATE TABLE aluguel (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    idCarro INTEGER NOT NULL,
    dataAluguel DATE NOT NULL,
    hora TIME NOT NULL,
    localRetirada TEXT NOT NULL,
    idUsuario INTEGER NOT NULL,
    Finalizado TEXT
);

CREATE TABLE loggedin (
    logged TEXT NOT NULL,
    id INT,
    nome TEXT
);