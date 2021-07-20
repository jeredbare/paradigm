# Paradigm

## About

### Purpose
Paradigm provides an user interface to analyze the json output from `enum` command from Amass.  The goal of this project is to notify Security and IT teams of assets they may not know is open to the internet.  Hence, we've built in a scoring system to check the HTTP Response codes of all assets found from the `enum` command from Amass.  

### Why?
TLS everywhere is probably one of the greatest things to happen in the InfoSec and IT space.  However, with the rise of cloud technologies TLS everywhere and automation means something a bit different in the environment.  Engineers, developers, and any other IT team can spin up cloud assets within a matter of seconds.  Most public cloud assets have a registered TLD and associated TLS certificate.  I ran an enumeration from Amass on the S3 domain in Amazon and was able to enumerate over 100,000 assets.  At the time, I did not run the response tool because I did not want to get the ban hammer from AWS.

[tweet]
https://twitter.com/jeredbare/status/1374087380601278471

## Using the Tool

### Prerequisites
* Docker
* Python3

### How to install and run
1. Clone this repository
`git clone https://github.com/jeredbare/paradigm`
2. In the master folder run 
`docker-compose build`
3. One the container is built run 
`docker-compose up`
4. Navigate to http://localhost:3000


# Scanning Amass Enumeration JSON Files
1. You will need the json file from the enumeration command in Amass.  You can do this by the following command 
`amass enum -d [domain] -json [json_file_name].json`
2. Upload the file to Paradigm.
`[json_file_name].json`
3. Click on "Get Score" and Paradigm will check the status codes of each discovered domain.  


Amass is an Open Source DNS Recon and Enumeration tool developed by the talented Jeff Caffix.  We wanted to provide a web interface for the results that Amass outputs to json from the enumeration command and display what domains may respond to a HTTP GET request.  The 200 responses will then be calculated into a score and reported back to the user.  The user can then compare the results reported from the Amass json file to the previous scan, local CMDB, asset list, etc.

This tool is geared towards to those who may not feel comfortable with the commandline and/or would like an interface to see the json output.  

## Scoring System

### DNS Scoring
* Based off percentage of environment that has a 200 request. 301s, 405s, 404s, and any other HTTP response is not part of the score calculation.  Scoring is also subjective as there may be components secured by other security controls; WAFs, firewalls, proxies, etc.  
* The scoring mechanism is based on your threat landscape.  The more discovered domains that are open to the internet, the higher score you will get (this is not ideal).

### Example
* If your `Scan Score` is 90% - that means 90% of the discovered domains responded back with 200 response and are open to the internet.  Scoring is subjective, however you may want to evaluate you environment to see if everything open to the internet that is supposed to be.  

### To Do
* We plan on running Amass in a docker container so can run commands from the web server.  This will be on the road map for this year.
* Automation tutorials.
* Integrate attack features for protected domain testing. 
* Improve the risk scoring feature. 
* Better error handling.

### Known Bugs
* Will not analyze a properly formatted JSON file.  It has to be the json file from the output of the command `amass enum -d [domain] -json [jsonFileName].json`  Paradigm will format the file upon upload.
* Sometimes the Python requests module will have a connection error out depending on the domain.  It's rare, but I have not been able to pinpoint the issue.  

# Thanks
Jeff Foley [@caffix](https://github.com/caffix) [twitter](https://twitter.com/jeff_foley)




