import requests
import json
from requests.exceptions import Timeout

# convert to list
targets = []
fqdn = []
domain = []
ip = []
cidr = []
loc = []
http_status_code = []
https_status_code = []
okResponses = 0

for line in open('D:/E Drive Downloads/gh.json', 'r'):
    targets.append(json.loads(line))

for i in targets:
    fqdn.append(i['name'])
    domain.append(i['domain'])
    ip.append((i['addresses'])[0]['ip'])

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
        okResponses = okResponses + 1
    except requests.exceptions.ConnectionError as e:
        http = "No HTTP Response"
        https = "No HTTPS Response"
        continue
responseDict = {'fqdn': fqdn, 'domain': domain, 'ip': ip, 'cidr': cidr, 'location': loc, 'http': http_status_code,
                'https': https_status_code}

resultScore = (okResponses / len(targets)) * 100
print("There were a total of " + len(targets) + " potential domains.")
print("We received a total of " + okResponses + " 200 responses.")
print("The result for this site is: " + f'{resultScore:.2f}')
