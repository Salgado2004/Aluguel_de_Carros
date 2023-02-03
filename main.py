import sqlQuery as bd
from flask import Flask, request, render_template
app = Flask(__name__)

def load_cars():
    cars_list = bd.get_cars()
    return cars_list

@app.route('/islogged', methods=['GET'])
def is_logged():
    login = bd.get_login()
    return {'login': login}, 200

@app.route('/login', methods=['POST', 'GET'])
def login():
    
    return render_template("login.html")

@app.route('/', methods=['POST', 'GET'])
def entry_page():
    cars = load_cars()
    return render_template("index.html", the_cars = cars)

app.run(debug=True)