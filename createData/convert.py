'''
Required modules:
json

'''
import json

fields = ["name", "cost", "description", "BMPS"]
jsonfile = open('../modules/data.json', 'r+')

jsonRead = open("data.json", 'r+').read()
parsedJson = json.loads(jsonRead)

jsonfile.seek(0)
jsonfile.truncate()
jsonfile.write("data='["+json.dumps(parsedJson)+"]'")