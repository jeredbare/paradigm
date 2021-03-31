import requests
import json


def scan_site(file_to_scan):
    targets = []
    ok_responses = 0
    json_response = {}
    scan_data = []
    response_dict = {'fqdn': '', 'domain': '', 'ip': [], 'cidr': '',
                     'loc': [], 'http': '', 'https': ''}

    for line in open(file_to_scan, 'r'):
        targets.append(json.loads(line))

    for target in targets:
        try:
            http = requests.get("http://{}".format(target['name']), timeout=1)
            https = requests.get("https://{}".format(target['name']), timeout=1)
            if http.status_code != 200 or https.status_code != 200:
                continue
            response_dict['fqdn'] = target['name']
            response_dict['domain'] = target['domain']
            response_dict['ip'] = target['addresses'][0]['ip']
            response_dict['cidr'] = target['addresses'][0]['cidr']
            response_dict['loc'] = target['addresses'][0]['desc']
            response_dict['http'] = str(http.status_code)
            response_dict['https'] = str(https.status_code)
            scan_data.append(response_dict)
            ok_responses = ok_responses + 1
        except requests.exceptions.ConnectionError as e:
            continue

    result_score = (ok_responses / len(targets)) * 100
    json_response["result_score"] = str(result_score)
    json_response["scan_data"] = scan_data
    return json_response
