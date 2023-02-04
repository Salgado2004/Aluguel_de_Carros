import sqlQuery as bd
from flask import Flask, request, render_template
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
        return login

@app.route('/logout', methods=['GET'])
def logout():
    logout = bd.logout()
    return logout

@app.route('/', methods=['GET'])
def entry_page():
    sort = request.args.get("sort")
    if sort == None:
        sort = "status"
    cars = load_cars(sort)
    return render_template("index.html", the_cars = cars)

app.run(debug=True)