import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_cars():
    conn = get_db_connection()
    carros = conn.execute('SELECT * FROM carros').fetchall()
    conn.close()
    
    cars_list = []
    for car in carros:
        cars_list.append({'id': car['id'], 'modelo': car['modelo'], 'marca': car['marca'], 'ano': car['ano'], 'obs': car['observation'], 'valor': car['valorDiaria'], 'status': car['statusCarro'], 'dono': car['idUsuario'], 'img': car['imgCarro']})
    
    return cars_list


#import hashlib
#senha = hashlib.sha1(b"senha").hexdigest()
#print(senha)