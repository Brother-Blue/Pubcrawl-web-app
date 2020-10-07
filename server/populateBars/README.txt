Simple script to populate the database with bars from Google API.

Run following command in any browser and change location & radius.
- https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=CHANGE_THIS&radius=CHANGE_THIS&type=bar&key=AIzaSyBt2p4bhMoBOFMJE3KVBjVhsyllqipfQ0M
(e.g: location=57.696977,11.880084&radius=1000)
Note, this only returns up to 60 per query. Run more and smaller requests with the help of https://www.mapdevelopers.com/draw-circle-tool.php.

Save the JSON response with title 'input.json' in current directory ('/populateBars') and run 'script.py'.

Manually feed DB with 'output.json'