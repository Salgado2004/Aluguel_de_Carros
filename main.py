import sqlQuery as bd
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)

def load_cars(sort):
    cars_list = bd.get_cars(sort)
    return cars_list

@app.route('/islogged', methods=['GET'])
def is_logged():
    login = bd.get_login()
    return {'login': login}, 200

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    if request.method == 'POST':
        email = request.json['email']
        senha = request.json['senha']
        login = bd.login(email, senha)
        return jsonify(login)

@app.route('/logout', methods=['GET'])
def logout():
    logout = bd.logout()
    return jsonify(logout)

@app.route('/meu-historico', methods=['GET'])
def historico():
    return render_template("historico.html")

@app.route('/add-car', methods=['GET'])
def addCar():
    return render_template("addCar.html")

@app.route('/new-car', methods=['POST'])
def newCar():
    data = request.get_json()
    if not data:
        return jsonify({'sucess': False, 'message': 'Bad request'})
    model = request.json['model']
    marca = request.json['marca']
    obs = request.json['obs']
    ano = request.json['ano']
    valor = request.json['valor']
    status = request.json['status']
    dono = request.json['dono']
    img = request.json['img']
    result = bd.new_car(model, marca, ano, obs, valor, status, dono, img)
    return jsonify(result)

@app.route('/', methods=['GET'])
def entry_page():
    sort = request.args.get("sort")
    if sort == None:
        sort = "status"
    cars = load_cars(sort)
    return render_template("index.html", the_cars = cars)

app.run(debug=True)