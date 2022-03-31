# -*- coding: utf-8 -*-
"""
Created on Thu Mar 17 12:33:50 2022

@author: Isabelle
"""

#tkinter module within python for GUI

import requests, json

# Get Request
#ip = ''
#host = 'http://' + ip + '/api/v2.0/'

host = 'http://mir.com/api/v2.0.0/'    # port for API 8080

# Format Headers
headers = {}
headers['Content-Type'] = 'application/json'
# Authorization Basic OmUzYjBjNDQyOThmYzFjMTQ5YWZiZjRjODk5NmZiOTI0MjdhZTQxZTQ2NDliOTM0Y2E0OTU5OTFiNzg1MmI4NTU=
headers['Authorization'] = 'Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA=='

get_missions = requests.get(host + 'missions', headers = headers)
#print(get_missions.text)

# Post Reuest
# to post a mission, guid is needed
mission_id = {"mission_id": "56f192d2-a45b-11ec-8ad2-94c691a3e2dc"}   # mission_id is GUID
post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
print(post_mission)