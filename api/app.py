from flask import Flask, jsonify
import csv

app = Flask(__name__)

@app.route('/api/data/')
def test_data():
    data = []
    with open("data.csv", encoding="utf8") as source:
        reader = csv.reader(source, delimiter=',')
        for row in reader:
            values = list(row)
            data.append({'id': values[0], 'region': values[1], 'count': int(values[2])})
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
