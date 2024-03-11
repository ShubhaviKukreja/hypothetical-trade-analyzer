import requests

url = 'http://localhost:8000/stocks/'
data = [
    {"stk_id": 1, "stk_name": "NFLX"},
    {"stk_id": 2, "stk_name": "Advanced Micro Devices Inc."},
    {"stk_id": 3, "stk_name": "Tesla Inc."},
    {"stk_id": 4, "stk_name": "Amazon.com"},
    {"stk_id": 5, "stk_name": "Meta"},
    {"stk_id": 6, "stk_name": "QUALCOMM"},
    {"stk_id": 7, "stk_name": "Cisco Inc."},
    {"stk_id": 8, "stk_name": "Microsoft"},
    {"stk_id": 9, "stk_name": "Starbucks"},
    {"stk_id": 10, "stk_name": "Apple Inc."},
]

response = requests.post(url, json=data)
print(response.text)