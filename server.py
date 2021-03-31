from flask import Flask
from flask_restful import Api, Resource
from inetaccess import scan_site

app = Flask(__name__)
api = Api(app)

results = {}


class ScanResults(Resource):
    def get(self):
        scan_results = scan_site('INSERT FILE LOCATION HERE')
        return scan_results


api.add_resource(ScanResults, "/scan-site", "/scan-site/")

if __name__ == '__main__':
    app.run(debug=True)
