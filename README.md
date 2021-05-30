# Purpose
Paradigm provides an user interface to analyze the json output from Amass.  The goal of this project is to notify Security and all IT teams of assets they may not know is open to the internet.  Hence, we've built in a scoring system to check the HTTP Response codes of all assets found from Amass.  

# Why?
Amass is a DNS Recon and Enumeration tool developed by the talented Jeff Caffix.  We wanted to provide a web interface for the results Amass saves from the json file from the enumeration command.  

### DNS Scoring
* Based of percentage of environment.  80 - 90% is bad, 50 - 70% Not great, 30 - 50% Bleh, 10 - 20% Better, 0 - 10% Really good
* Formula = count / count + http_status code

If the Scan Score comes back as 90%.  That means 90% of the domains listed are open to the internet.

### To Do
We plan on running Amass in a docker container so can run commands from the web server.  This will be on the road map for this year.  




