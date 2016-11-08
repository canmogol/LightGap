from flask import Flask, request, send_from_directory, make_response, redirect

app = Flask(__name__)

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.before_request
def before_request():
	aca_id = request.cookies.get('session_id')
	if aca_id is not None:
		print('before_request aca_id: ', aca_id, request)

@app.route("/list")
def list():
	aca_id = request.cookies.get('session_id')
	if aca_id == '123123123':
		return '[{"id":"1","name":"aaa"},{"id":"2","name":"vvv"},{"id":"3","name":"qqq"},{"id":"4","name":"xxx"}]'
	else:
		return '[]'

@app.route("/login")
def login():
	response = make_response(redirect('/login2'))
	response.set_cookie('session_id', '123123123')
	return response

@app.route("/login2")
def login2():
    return '{"isLogged":"true", "message": "Welcome", "user": "John Doe"}'

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/image/<path:path>')
def send_image(path):
    return send_from_directory('image', path)

@app.route('/html/<path:path>')
def send_html(path):
    return send_from_directory('html', path)

if __name__ == "__main__":
    app.run()
