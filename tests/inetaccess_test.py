import unittest
from src import inetaccess


class ScanDataTest(unittest.TestCase):

    def test_no_response(self):
        expected_results = {
            "result_score": "0.0",
            "scan_data": [
                {
                    "fqdn": "testing.notworking.com.co",
                    "domain": "notworking.com.co",
                    "ip": "0.0.0.0",
                    "cidr": "0.0.0.0/24",
                    "loc": "TESTING",
                    "http": "No Response",
                    "https": "No Response"
                },
            ]
        }
        scan_results = inetaccess.scan_site('./tests/test_resources/scan_test.json')
        self.assertEqual(scan_results, expected_results)
