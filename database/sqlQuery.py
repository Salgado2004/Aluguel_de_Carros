import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

conn = get_db_connection()
carros = conn.execute('SELECT * FROM carros').fetchall()
conn.close()

for car in carros:
    print(car['marca'], car['modelo'], car['imgCarro'])