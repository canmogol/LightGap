from flask import Flask, request, send_from_directory, make_response, redirect
import time

app = Flask(__name__, static_url_path='')

@app.before_request
def before_request():
	authenticatedMethods = ['/list', '/another']
	session_id = request.cookies.get('session_id')
	if session_id is None and any(request.path in s for s in authenticatedMethods):
		response = make_response(redirect('/error'))
		response.set_cookie('session_id', '', expires=0)
		return response

@app.route("/error")
def error():
	return '{"error":"unauthorized request"}'

@app.route("/login")
def login():
	response = make_response(redirect('/login2'))
	response.set_cookie('session_id', '123123123')
	return response

@app.route("/login2")
def login2():
    time.sleep(1)
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
