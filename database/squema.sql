CREATE TABLE carros (
    id INT PRIMARY KEY AUTOINCREMENT UNIQUE,
    modelo TEXT NOT NULL,
    marca TEXT NOT NULL,
    ano INT NOT NULL,
    observation TEXT,
    valorDiaria FLOAT NOT NULL,
    statusCarro INT NOT NULL
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTOINCREMENT UNIQUE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    historico TEXT
);

CREATE TABLE aluguel (
    id INT PRIMARY KEY AUTOINCREMENT UNIQUE,
    idCarro INT NOT NULL,
    dataAluguel DATE NOT NULL,
    hora TIME NOT NULL,
    localRetirada TEXT NOT NULL,
    idUsuario INT NOT NULL,
    KEY FK_usuarios (idUsuario),
    KEY FK_carros (idCarro),
    CONSTRAINT FK_usuarios FOREIGN KEY (idUsuario) REFERENCES usuarios (id),
    CONSTRAINT FK_carros FOREIGN KEY (idCarro) REFERENCES carros (id)
);