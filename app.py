from flask import Flask, jsonify, send_file, request, redirect
import requests

app = Flask(__name__, static_url_path='/', static_folder='whois-ng3/dist/whois-ng3/')

@app.route('/')
def hello_world():
    return redirect('/index.html')

@app.route('/api/search')
def api_search():
    r = requests.get('http://rest.db.ripe.net/search.json', params=request.args.items(multi=True))
    j = r.json()
    return jsonify(j)

@app.route('/api/<source>/<objectType>/<path:key>')
def api_obj(source, objectType, key):
    r = requests.get(f'http://rest.db.ripe.net/{source}/{objectType}/{key}.json')
    j = r.json()
    return jsonify(j)

