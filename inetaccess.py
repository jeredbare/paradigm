import requests
import json
from requests.exceptions import Timeout

#convert to list 
targets = []
fqdn = []
domain = []
ip = []
cidr = []
loc = []
http_status_code=[]
https_status_code = []



for line in open('[amass_json_file]', 'r'):
    targets.append(json.loads(line))

for i in targets:
    fqdn.append(i['name'])
    domain.append(i['name'])
    ip.append(i['domain'])

    for a in i['addresses']:
        ip.append(a['ip'])
        cidr.append(a['cidr'])
        loc.append(a['desc'])



for i in fqdn:
    try:
        http = requests.get("http://{}".format(i), timeout=2)
        https = requests.get("https://{}".format(i), timeout=2)
        print(i)
        print("HTTP Response: " + str(http.status_code))
        print("HTTPS Response: " + str(https.status_code) + "\n")
        http_status_code.append(http)
        https_status_code.append(https)
    except requests.exceptions.ConnectionError as e: 
        http = "No HTTP Response"
        https = "No HTTPS Response"
        continue
dict = {'fqdn': fqdn, 'domain': domain, 'ip': ip, 'cidr': cidr, 'location': loc, 'http': http_status_code, 'https': https_status_code}
