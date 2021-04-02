import json 
import subprocess

# amass enum -ip -brute -active -min-for-recursive 3 -d carfax.com -json carfax.json
# this can be modified to be a bit quicker.  

# whois check
def intel(domain):   
    intel_command = [
        "amass",
        "intel",
        "-whois",
        "-d",
        "{}".format(domain),
        "-o",
        "whois_{}2.txt".format(domain)
    ]       

    intel_scan = subprocess.run(intel_command)
    return domain

# enumeration
def enum(domains):
    enum_command = [
        "amass",
        "enum",
        "-d",
        "{}".format(domains),
        "-json",
        "{}.json".format(domains)
    ]       

    enum_scan = subprocess.run(enum_command)
    return domains
