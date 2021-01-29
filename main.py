from flask import Flask, render_template, request, jsonify
import json
app = Flask(__name__)
login_user = None
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/baza_filmowa")
def baza_filmowa():
    return render_template("baza_filmowa.html")


@app.route("/premiery")
def premiery():
    return render_template("premiery.html")


@app.route("/news")
def news():
    return render_template("news.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/registration")
def registration():
    return render_template("registration.html")


@app.route("/post_registration_page")
def post_registration_page():
    return render_template("post_registration_page.html")


@app.route("/post_login_page")
def post_login_page():
    return render_template("post_login_page.html")


@app.route("/registration/data", methods=['GET'])
def get_email_array():
    email_array = []
    f = open('./static/data/users.txt', 'r')
    lines = f.readlines()

    for line in lines:
        usr_data = line.split('|')
        email_array.append(usr_data[0])
    f.close()

    if request.method == 'GET':
        return jsonify({'emailarray': email_array})


@app.route("/login/data", methods=['GET'])
def get_data_array():
    email_array = []
    password_array = []
    f = open('./static/data/users.txt', 'r')
    lines = f.readlines()

    for line in lines:
        usr_data = line.split('|')
        email_array.append(usr_data[0])
        password_array.append(usr_data[1])
    f.close()

    if request.method == 'GET':
        return jsonify({'emailarray': email_array, 'passwordarray': password_array})


@app.route('/registration', methods=['POST'])
def get_names():
    global login_user
    if request.method == 'POST':

        f = open("./static/data/users.txt", "a+")

        user = request.form['email']
        password = request.form['password']
        name = request.form['name']
        surname = request.form['surname']
        gender = request.form['gender']
        age = request.form['age']
        birthdate = request.form['birthdate']
        user_data = user + '|' + password + '|' + name + '|' + surname + '|' + gender + '|' + age + '|' + birthdate
        f.write('\n')
        f.write(user_data)
        f.close()

        new_file_path = "./static/data/" + user + ".txt"

        new_file = open(new_file_path, "w+")
        new_file.write(user)
        new_file.close()

        login_user = user
        return json.dumps({'status': 'OK', 'user': user, 'pass': password})


@app.route('/login', methods=['POST'])
def get_login_user():
    global login_user
    if request.method == 'POST':

        user = request.form['usrlogin']

        login_user = user
        return json.dumps({'status': 'OK'})


@app.route("/baza_filmowa/suggestions", methods=['POST'])
def baza_filmowa_suggestions():
    global login_user
    if request.method == 'POST':
        fav_movies = []
        usr = login_user
        if usr == None:
            return jsonify({'favmovies': fav_movies})

        new_file_path = "./static/data/" + usr + ".txt"
        f = open(new_file_path, "r")
        f.readline()
        lines = f.readlines()

        for line in lines:
            fav_movies.append(line)
        f.close()

        return jsonify({'favmovies': fav_movies})


@app.route("/baza_filmowa/addtofav", methods=['GET'])
def add_to_favourite():
    global login_user
    if request.method == 'GET':
        user_now = login_user
        data = request.args.get('data_movie')
        if user_now != None:
            curr_fav_movies = []
            new_file_path = "./static/data/" + user_now + ".txt"
            f = open(new_file_path, "r+")
            f.readline()

            lines = f.readlines()
            for line in lines:
                curr_fav_movies.append(line.rstrip('\n'))
            if data in curr_fav_movies:
                return json.dumps({'status': 'OK'})
            f.write('\n')
            f.write(data)
            f.close()
        return json.dumps({'status': 'OK'})


if __name__ == "__main__":
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)

