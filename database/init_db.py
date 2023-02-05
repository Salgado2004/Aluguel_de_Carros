import sqlite3

connection = sqlite3.connect('database.db')


with open('database/squema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("""INSERT INTO usuarios (nome, email, senha, historico) VALUES 
            ('Leonardo Salgado', 'leosalgado2004@gmail.com', '8fe15b78f0c4e515db19e72585efb585e8614158', '{"rentCount": 1, "rentIds": [1]}'),
            ('Laura Yamada', 'laurabeeyama@gmail.com', '606f4274a6374cc41c8348b678e23102e219a62f', '{"rentCount": 0, "rentIds": []}'),
            ('João Silva', 'joao.silva@gmail.com', '8cb2237d0679ca88db6464eac60da96345513964', '{"rentCount": 0, "rentIds": []}'),
            ('Pedro Souza', 'pedro.souza@gmail.com', '7751a23fa55170a57e90374df13a3ab78efe0e99', '{"rentCount": 0, "rentIds": []}')""")

cur.execute("""INSERT INTO carros (modelo, marca, ano, observation, valorDiaria, statusCarro, idUsuario, imgCarro) VALUES 
            ('Uno 1.0', 'Fiat', 2016, 'Placa: AFK 2039', 150.00, 1, 1, 'carro1.png'),
            ('Kwid 1.0', 'Renault', 2018, 'Placa: TSG 2309', 160.00, 1, 1, 'carro2.png'),
            ('Onix 1.0', 'Chevrolet', 2020, 'Placa: PWD 6450', 230.00, 1, 2, 'carro3.png'),
            ('HB20s 1.0', 'Hyundai', 2019, 'Placa: GHI 8055', 230.00, 3, 4, 'carro4.png'),
            ('Compass 1.0', 'Jeep', 2020, 'Placa: LFE 6409', 280.00, 1, 3, 'carro5.png'),
            ('Gol 1.0', 'Volkswagen', 2015, 'Placa: RTE 7352', 120.00, 2, 4, 'carro6.png')""")

cur.execute("INSERT INTO aluguel (idCarro, dataAluguel, hora, localRetirada, idUsuario, finalizado) VALUES (?, ?, ?, ?, ?, ?)",
            ('6', '02-03-2023', '13:45', 'Curitiba', '1', 'não')
            )

cur.execute("INSERT INTO loggedin (logged, id, nome) VALUES (?, ?, ?)",
            ('True', '1', 'Leonardo Salgado')
            )

connection.commit()
connection.close()