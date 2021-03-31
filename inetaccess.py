import requests
import json


def scan_site(file_to_scan):
    targets = []
    ok_responses = 0
    json_response = []

    for line in open(file_to_scan, 'r'):
        targets.append(json.loads(line))

    for target in targets:
        try:
            response_dict = {'fqdn': '', 'domain': '', 'ip': [], 'cidr': '', 'loc': [], 'http': '', 'https': ''}
            http = requests.get("http://{}".format(target['name']), timeout=2)
            https = requests.get("https://{}".format(target['name']), timeout=2)
            print("\nHTTP Response: " + str(http.status_code))
            print("HTTPS Response: " + str(https.status_code))
            response_dict['fqdn'] = target['name']
            response_dict['domain'] = target['domain']
            response_dict['ip'] = target['addresses'][0]['ip']
            response_dict['cidr'] = target['addresses'][0]['cidr']
            response_dict['loc'] = target['addresses'][0]['desc']
            response_dict['http'] = str(http.status_code)
            response_dict['https'] = str(https.status_code)
            json_response.append(response_dict)
            ok_responses = ok_responses + 1
        except requests.exceptions.ConnectionError as e:
            print("No Response from " + str(target['name']) + "!")
            http = "No HTTP Response"
            https = "No HTTPS Response"
            continue

    result_score = (ok_responses / len(targets)) * 100
    json_response.append({"result_score":  str(result_score)})
    print("There were a total of " + str(len(targets)) + " potential domains.")
    print("We received a total of " + str(ok_responses) + " http/https 200 responses.")
    print("The result for this site is: " + f'{result_score:.2f}')
    return json_response
