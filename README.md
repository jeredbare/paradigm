# Purpose
The purpose of this tool is to give managers and senior level management the proper metrics to make data-driven decisions.  This tool focuses on "must fix" vulnerabilities instead of fixing everything.  

# Architecture
Back-end makes a call to Vendor API product > grabs the vulnerability data and stores it > runs scoring against the data > produces dashboards

# TO DO (in no order)

# Integrations (with callable APIs)
* VeraCode
* Tenable Products
* Dependency Checker
* GitLab
* Cloud Conformity
* OWASP Amass (DNS Scoring)

# Writing the Parser
This will be different for each product.  The important thing is to make sure we're parsing the data from each product via JSON.  

# Storing the Data
* Develop the ERD
* Choose DBMS (Postgres?, NoSQL?)

# Front-End development (probably react or node)
* Must-fix dashboard
* Risk Score Dashboard (out of 1000) -- For Vuln Management Products
* Products 
* Must-Fix Dashboards via each product integrated 

# Risk Score Calculations

### Must-Fix no negotiation
meets the following criteria:
* cvss score of 9-10
* impact high
* level of effort low
* exploit-code: yes
* _fill in others criteria if needed_

### DNS Scoring
* Based of percentage of environment.  80 - 90% is bad, 50 - 70% Not great, 30 - 50% Bleh, 10 - 20% Better, 0 - 10% Really good
* Formula = count / count + http_status code



### References
NIST 800-30, 37, 39


