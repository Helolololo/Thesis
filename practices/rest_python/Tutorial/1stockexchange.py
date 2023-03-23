# TUTORIAL
# https://www.youtube.com/watch?v=qbLc5a9jdXo&ab_channel=CalebCurry
import requests
import json

response = requests.get('http://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow')

# print(response)
# print(respons(json))

for question in response.json()['items']:
    if question['answer_count'] == 0:       # stackoverflow questions which have not been answered yet
        print(question['title'])
        print(question['link'])
    else:
        print("skipped")
    print()