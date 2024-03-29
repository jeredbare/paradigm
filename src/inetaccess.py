import requests
import json
import datetime


def build_response_dict(build_dict, target, http, https, timestamp):
    build_dict['fqdn'] = target['name']
    build_dict['domain'] = target['domain']
    build_dict['ip'] = target['ip']
    build_dict['cidr'] = target['cidr']
    build_dict['loc'] = target['desc']
    build_dict['http'] = http
    build_dict['https'] = https
    build_dict['timestamp'] = timestamp
    return build_dict


def scan_site(targets):
    ok_responses = 0
    json_response = {}
    scan_data = []

    for target in targets:
        response_dict = {'fqdn': '', 'domain': '', 'ip': [], 'cidr': '', 'loc': [], 'http': '', 'https': '', 'timestamp': []}
        try:
            http = requests.get("http://{}".format(target['name']), timeout=2)
            https = requests.get("https://{}".format(target['name']), timeout=2)
            
            t = datetime.datetime.now()
            scan_data.append(build_response_dict(response_dict, target, str(http.status_code), str(https.status_code), str(t.strftime("%d/%m/%Y %H:%M:%S"))))
            
            if http.status_code != 200 or https.status_code != 200:
                continue
            ok_responses = ok_responses + 1
        except requests.exceptions.ConnectionError as e:
            scan_data.append(build_response_dict(response_dict, target, "No Response", "No Response", "----"))
            continue
        except requests.exceptions.ConnectTimeout as f:
            scan_data.append(build_response_dict(response_dict, target, "No Response", "No Response", "----"))
            continue

    result_score = round((ok_responses / len(targets)) * 100)
    json_response["result_score"] = str(result_score)
    json_response["scan_data"] = scan_data
    return json_response
