import sqlite3
import hashlib

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
            order = "ano  DESC"

    conn = get_db_connection()
    carros = conn.execute(f'SELECT * FROM carros ORDER BY {order}').fetchall()
    conn.close()
    
    cars_list = []
    for car in carros:
        dono = car['idUsuario']
        conn = get_db_connection()
        user = conn.execute(f'SELECT nome FROM usuarios WHERE id = {dono}').fetchall()
        conn.close()
        cars_list.append({'id': car['id'], 'modelo': car['modelo'], 'marca': car['marca'], 'ano': car['ano'], 'obs': car['observation'], 'valor': car['valorDiaria'], 'status': car['statusCarro'], 'dono': car['idUsuario'], 'nomeDono': user[0]['nome'], 'img': car['imgCarro']})
    
    return cars_list

def new_car(model, marca, ano, obs, valor, status, dono, img):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f"""INSERT INTO carros (modelo, marca, ano, observation, valorDiaria, statusCarro, idUsuario, imgCarro) VALUES 
            ('{model}', '{marca}', {ano}, 'Placa: {obs}', {valor}.0, {status}, {dono}, '{img}')""")
    conn.commit()
    conn.close()
    result = {'sucess': True, 'message': "Carro salvo"}
    return result

def deleteCar(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f"DELETE FROM carros WHERE id = {id}")
    conn.commit()
    conn.close()
    result = {'sucess': True, 'message': 'Carro deletado'}
    return result

def updateCar(id, obs, valor, statusCarro):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f"UPDATE carros SET observation='Placa: {obs}', valorDiaria={valor}, statusCarro={statusCarro} WHERE id = {id}")
    conn.commit()
    conn.close()
    result = {'sucess': True, 'message': 'Carro atualizado'}
    return result

def get_login():
    conn = get_db_connection()
    login = conn.execute('SELECT * FROM loggedin').fetchall()
    conn.close()
    return {'logged': login[0]['logged'], 'id': login[0]['id'], 'nome': login[0]['nome']}

def login(email, senha):
    f_senha = hashlib.sha1(senha.encode('utf-8')).hexdigest()

    conn = get_db_connection()
    usuarios = conn.execute('SELECT * FROM usuarios').fetchall()
    conn.close()
    for user in usuarios:
        if user['email'] == email:
            if user['senha'] == f_senha:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute(f"UPDATE loggedin SET logged = 'True', id = {user['id']}, nome = '{user['nome']}'")
                conn.commit()
                conn.close()
                return {"sucess": True, "message": "Login sucedido"}
            else:
                return {"sucess": False, "message": "Senha inválida"}
    return {"sucess": False, "message": "Usuário não encontrado"}
    

def logout():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f"UPDATE loggedin SET logged = 'False', id = 0, nome = ''")
    conn.commit()
    conn.close()
    return {"sucess": True, "message": "Logout sucedido"}