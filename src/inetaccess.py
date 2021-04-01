import requests
import json


def build_response_dict(build_dict, target, http, https):
    build_dict['fqdn'] = target['name']
    build_dict['domain'] = target['domain']
    build_dict['ip'] = target['addresses'][0]['ip']
    build_dict['cidr'] = target['addresses'][0]['cidr']
    build_dict['loc'] = target['addresses'][0]['desc']
    build_dict['http'] = http
    build_dict['https'] = https
    return build_dict


def scan_site(file_to_scan):
    targets = []
    ok_responses = 0
    json_response = {}
    scan_data = []

    with open(file_to_scan) as file:
        for line in file:
            targets.append(json.loads(line))

    for target in targets:
        response_dict = {'fqdn': '', 'domain': '', 'ip': [], 'cidr': '', 'loc': [], 'http': '', 'https': ''}
        try:
            http = requests.get("http://{}".format(target['name']), timeout=2)
            https = requests.get("https://{}".format(target['name']), timeout=2)
            scan_data.append(build_response_dict(response_dict, target, str(http.status_code), str(https.status_code)))
            if http.status_code != 200 or https.status_code != 200:
                continue
            ok_responses = ok_responses + 1
        except requests.exceptions.ConnectionError as e:
            scan_data.append(build_response_dict(response_dict, target, "No Response", "No Response"))
            continue

    result_score = (ok_responses / len(targets)) * 100
    json_response["result_score"] = str(result_score)
    json_response["scan_data"] = scan_data
    return json_response
