from flask import Flask, request
from flask_restful import Api, Resource
from inetaccess import scan_site


app = Flask(__name__)
api = Api(app)

results = {}


@app.route('/scan-site', methods=['POST'])
def get_scan_results():
    content = request.get_json(silent=True)
    scan_results = scan_site(content["file_to_scan"])
    return scan_results
