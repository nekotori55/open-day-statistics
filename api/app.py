from flask import Flask, jsonify
import csv

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/data/')
def test_data():
    data = []
    with open("data.csv", encoding="utf8") as source:
        reader = csv.reader(source, delimiter=',')
        for row in reader:
            values = list(row)
            data.append({'id': values[0], 'region': values[1], 'count': int(values[2])})
def get_data():
    data = {}

    conn = get_db_connection()
    regions = conn.execute('SELECT region_id as id, region_name as name FROM regions').fetchall()
    regions = [dict(row) for row in regions]
    data['regions'] = regions

    districts = conn.execute('SELECT district_id as id, district_name as name FROM district').fetchall()
    districts = [dict(row) for row in districts]
    data['districts'] = districts

    schools = conn.execute('SELECT school_id as id, school_name as name FROM schools').fetchall()
    schools = [dict(row) for row in schools]
    data['schools'] = schools

    conn.close()

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
