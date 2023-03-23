# -*- coding: utf-8 -*-
"""
Created on Thu Mar 17 14:12:44 2022

@author: Isabelle
"""

import requests, json
from tkinter import *

host = 'http://mir.com/api/v2.0.0/'    # port for API 8080

# Format Headers
headers = {}
headers['Content-Type'] = 'application/json'
headers['Authorization'] = 'Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA=='

# Get Request
def get_missions(host, headers):
    get_missions = requests.get(host + 'missions', headers = headers)

# Post Reuest
def post_missions(host, headers):
    mission_id = {"mission_id": "56f192d2-a45b-11ec-8ad2-94c691a3e2dc"}   # mission_id is GUID
    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    print(post_mission)
  
# Delete Request
def delete_queue(host, headers):
    delete = requests.delete(host + 'mission_queue', headers = headers)

# GUI
#window = Tk()
#window.title('MiR Rest Commands')
#window.geometry("100x150")

#btn1 = Button(window, text = 'Start mission', command = post_missions(host, headers))
#btn1.place(x=10, y=10) 

#btn2 = Button(window, text = 'Delete Queue', command = delete_queue(host, headers))
#btn2.place(x = 10, y = 40)

#window.mainloop()
# BUTTONS OF GUI IS NOT WORKING!!!!!!!!!!!!!!
