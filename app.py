from flask import Flask, render_template, jsonify
import mysql.connector

app = Flask(__name__, static_url_path='', static_folder='.', template_folder='.')

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='1234',
        database='ferreteria'
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products')
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products')
    productos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(productos)

if __name__ == '__main__':
    app.run(debug=True)

