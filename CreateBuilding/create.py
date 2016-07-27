'''
Required modules:
json

'''
import json

fields = ["name", "cost", "description", "BMPS"]
jsonfile = open('../modules/data.json', 'r+')
jsonRead = jsonfile.read()[7:-2]
parsedJson = json.loads(jsonRead)

results = []
for x in fields:
	results.append(str(input(x + "> ")))

parsedJson["buildings"][results[fields.index("cost")]] = {}

for x in range(len(fields)):
	parsedJson["buildings"][results[fields.index("cost")]][fields[x]] = results[x];

print(json.dumps(parsedJson))
jsonfile.seek(0)
jsonfile.truncate()
jsonfile.write("data='["+json.dumps(parsedJson)+"]'")