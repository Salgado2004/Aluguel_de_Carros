import sqlite3

connection = sqlite3.connect('database.db')


with open('database/squema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO usuarios (nome, email, senha, historico) VALUES (?, ?, ?, ?)",
            ('Leonardo Salgado', 'leosalgado2004@gmail.com', '8fe15b78f0c4e515db19e72585efb585e8614158', 'Alugou um Gol em 03/02/2023')
            )

cur.execute("""INSERT INTO carros (modelo, marca, ano, observation, valorDiaria, statusCarro, idUsuario, imgCarro) VALUES 
            ('Uno 1.0', 'Fiat', 2016, 'Placa: AFK 2039', 150.00, 1, 1, 'carro1.png'),
            ('Kwid 1.0', 'Renault', 2018, 'Placa: TSG 2309', 160.00, 1, 1, 'carro2.png'),
            ('Onix 1.0', 'Chevrolet', 2020, 'Placa: PWD 6450', 230.00, 1, 4, 'carro3.png'),
            ('HB20s 1.0', 'Hyundai', 2019, 'Placa: GHI 8055', 230.00, 1, 3, 'carro4.png'),
            ('Compass 1.0', 'Jeep', 2020, 'Placa: LFE 6409', 280.00, 1, 2, 'carro5.png'),
            ('Gol 1.0', 'Volkswagen', 2015, 'Placa: RTE 7352', 120.00, 2, 2, 'carro6.png')""")

cur.execute("INSERT INTO aluguel (idCarro, dataAluguel, hora, localRetirada, idUsuario) VALUES (?, ?, ?, ?, ?)",
            ('6', '02-03-2023', '13:45', 'Curitiba', '1')
            )

cur.execute("INSERT INTO loggedin (logged, id, nome) VALUES (?, ?, ?)",
            ('True', '1', 'Leonardo Salgado')
            )

connection.commit()
connection.close()