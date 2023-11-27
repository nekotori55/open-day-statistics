from flask import Flask, jsonify, request, json
import csv

app = Flask(__name__)


@app.route('/api/get_data/')
def test_data():
    data = []
    with open("data.csv", encoding="utf8") as source:
        reader = csv.reader(source, delimiter=',')
        for row in reader:
            values = list(row)
            data.append({'id': values[0], 'region': values[1], 'count': int(values[2])})
    return jsonify(data)


@app.route('/api/add_data/', methods=['GET', 'POST'])
def add_test_data():
    if request.method == 'POST':
        a = request.get_json()

        # data = []
        # with open("data.csv", encoding="utf8") as source:
        #     reader = csv.reader(source, delimiter=',')
        #     for row in reader:
        #         values = list(row)
        #         data.append({'id': values[0], 'region': values[1], 'count': int(values[2])})
        #
        # with open("data.csv", 'w', encoding="utf8") as source:
        #     writer = csv.writer(source, delimiter=',')
        #     writer.writerow()

        new_data = []

        with open('data.csv', encoding='utf8', newline='') as inf:
            reader = csv.reader(inf, delimiter=',')

            for row in reader:
                aboba = list(row)
                print(aboba)
                if aboba[1] == a['district']:
                    aboba[2] = int(aboba[2]) + 1
                new_data.append(aboba)
                print(aboba)

            print(new_data)

        with open('data.csv', 'w', encoding='utf8', newline='') as outf:
            writer = csv.writer(outf, delimiter=',')
            writer.writerows(new_data)
            print(new_data)


    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)
