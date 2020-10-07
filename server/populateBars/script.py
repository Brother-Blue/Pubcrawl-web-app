import json
import os
import requests
# TODO: add support to save directly to the database

myfile_path = os.path.dirname(__file__)

with open(os.path.join(myfile_path, 'input.json'), 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    bars = {}
    bars['bars'] = []
    for p in data['results']:
        bars['bars'].append({
            'name': p['name'],
            'latLong': [p['geometry']['location']['lat'], p['geometry']['location']['lng']],
            'address': p['vicinity'],
            'photo': requests.get('https://maps.googleapis.com/maps/api/place/photo?photoreference=' + str(p['photos'][0]['photo_reference']) + '&sensor=false&maxheight='+ str(p['photos'][0]['height']) + '&maxwidth='+ str(p['photos'][0]['width']) + '&key=AIzaSyBt2p4bhMoBOFMJE3KVBjVhsyllqipfQ0M').url
        })
print(bars)
with open(os.path.join(myfile_path, 'output.json'), 'w', encoding='utf-8') as outfile:
    json.dump(bars, outfile, indent=4, ensure_ascii=False)
