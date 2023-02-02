import sqlite3
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def entry_page():
    return render_template("index.html")


app.run(debug=True)