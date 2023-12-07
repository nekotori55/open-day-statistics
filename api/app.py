from flask import Flask, jsonify, request, json
import csv
import sqlite3

app = Flask(__name__)


def get_db_connection_row():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn




@app.route('/api/form_data/')
def get_form_data():
    data = {}

    conn = get_db_connection_row()
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


@app.route('/api/count_data/')
def get_count_data():
    data = {}
    conn = get_db_connection_row()

    regions = conn.execute(''
                           'SELECT regions.region_id as id, regions.region_name as name, count(visitors.visitor_id) as count '
                           'from regions '
                           'left join visitors '
                           'on (regions.region_id = visitors.region_id) '
                           'group by '
                           '    regions.region_id '
                           '').fetchall()
    regions = [dict(row) for row in regions]

    districts = conn.execute(''
                             'SELECT districts.district_id as id, districts.district_name as name, count(visitors.visitor_id) as count '
                             'from districts '
                             'left join visitors '
                             'on (districts.district_id = visitors.district_id) '
                             'group by '
                             '   districts.district_id; '
                             '').fetchall()
    districts = [dict(row) for row in districts]

    data['regions'] = regions
    data['districts'] = districts

    return jsonify(data)


@app.route('/api/add_data/', methods=['GET', 'POST'])
def add__data():
    if request.method == 'POST':
        sql_query = ("insert into visitors (with_relatives, study_class, region_id, is_foreing, district_id, school_id)"
                     "VALUES (?, ?, ?, false, ?, ?);")

        a = request.get_json()

        with_relatives = True if a.get('withParents') == 1 else False
        school_class = a.get('school_class')
        region = a.get('region') if a.get('region') != '' else None
        district = a.get('district') if a.get('discrict') != '' else None
        school = a.get('school') if a.get('school') != '' else None

        data_tuple = (with_relatives, school_class, region, district, school)

        conn = sqlite3.connect('database.db')
        cur = conn.cursor()

        cur.execute(sql_query, data_tuple)

        conn.commit()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}






if __name__ == '__main__':
    app.run(debug=True)
