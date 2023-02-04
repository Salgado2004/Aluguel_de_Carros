import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_cars(sort):
    match sort:
        case "status":
            order = "statusCarro"
        case "price":
            order = "valorDiaria"
        case "year":
            order = "ano"

    conn = get_db_connection()
    carros = conn.execute(f'SELECT * FROM carros ORDER BY {order}').fetchall()
    conn.close()
    
    cars_list = []
    for car in carros:
        cars_list.append({'id': car['id'], 'modelo': car['modelo'], 'marca': car['marca'], 'ano': car['ano'], 'obs': car['observation'], 'valor': car['valorDiaria'], 'status': car['statusCarro'], 'dono': car['idUsuario'], 'img': car['imgCarro']})
    
    return cars_list

def get_login():
    conn = get_db_connection()
    login = conn.execute('SELECT * FROM loggedin').fetchall()
    conn.close()
    return {'logged': login[0]['logged'], 'id': login[0]['id'], 'nome': login[0]['nome']}

#import hashlib
#senha = hashlib.sha1(b"senha").hexdigest()
#print(senha)